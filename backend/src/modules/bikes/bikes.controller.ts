import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { BikeService } from './bikes.service';
import { Bike } from './entities/bike.entity';
import { CreateBikeDto, CreateBikeTranslationDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { File as MulterFile } from 'multer';
import { plainToInstance } from 'class-transformer';
import { BikePriceDto } from './dto/create-bike.dto';
import { Auth } from '../../shared/guards/auth.decorator';
import { RoleIds } from '../../shared/constants/roles.enum';

@Controller('bikes')
export class BikeController {
  private readonly logger = new Logger(BikeController.name);
  constructor(
    private readonly bikeService: BikeService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getAllBikes(): Promise<Bike[]> {
    return this.bikeService.findAll();
  }

  @Get(':id')
  async getBikeById(@Param('id') id: number): Promise<Bike> {
    return this.bikeService.findOneById(id);
  }

  // Эндпоинт для создания велосипеда с загрузкой фотографий
  @Auth(RoleIds.Admin)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 5 }], {
      storage: diskStorage({
        destination: './uploads/bikes',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const filename = `bike-${uniqueSuffix}${fileExtName}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async createBike(
    @UploadedFiles() files: { photos?: MulterFile[] },
    @Body() bikeData: CreateBikeDto,
  ): Promise<Bike> {
    // Смотрим, что пришло в body до любой трансформации
    this.logger.debug('--- Raw bikeData (before manual parse) ---');
    this.logger.debug(JSON.stringify(bikeData, null, 2));

    if (files.photos && files.photos.length > 0) {
      const baseUrl = this.configService.get<string>('baseUrl');
      bikeData.imageUrls = files.photos.map((file) => `${baseUrl}/uploads/bikes/${file.filename}`);
    }

    // Логируем bikeData.prices и bikeData.translations, чтобы понять, что там
    this.logger.debug('bikeData.prices: ' + JSON.stringify(bikeData.prices));
    this.logger.debug('bikeData.translations: ' + JSON.stringify(bikeData.translations));

    // Если prices строка — парсим
    if (typeof bikeData.prices === 'string') {
      this.logger.debug('prices is string, try parse JSON');
      try {
        const parsed = JSON.parse(bikeData.prices);
        this.logger.debug('prices parsed: ' + JSON.stringify(parsed));
        bikeData.prices = plainToInstance(BikePriceDto, Array.isArray(parsed) ? parsed : [parsed], {
          excludeExtraneousValues: true,
        });
      } catch (e) {
        this.logger.warn('Error parsing prices JSON: ' + e);
        bikeData.prices = [];
      }
    }

    // Если translations строка — парсим
    if (typeof bikeData.translations === 'string') {
      this.logger.debug('translations is string, try parse JSON');
      try {
        const parsed = JSON.parse(bikeData.translations);
        this.logger.debug('translations parsed: ' + JSON.stringify(parsed));
        bikeData.translations = plainToInstance(
          CreateBikeTranslationDto,
          Array.isArray(parsed) ? parsed : [parsed],
          { excludeExtraneousValues: true },
        );
      } catch (e) {
        this.logger.warn('Error parsing translations JSON: ' + e);
        bikeData.translations = [];
      }
    }

    // После парсинга смотрим, что в bikeData
    this.logger.debug('--- bikeData after manual parse ---');
    this.logger.debug(JSON.stringify(bikeData, null, 2));

    return this.bikeService.createBike(bikeData);
  }

  @Auth(RoleIds.Admin)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 5 }], {
      storage: diskStorage({
        destination: './uploads/bikes',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `bike-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(new Error('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async updateBike(
    @Param('id') id: number,
    @UploadedFiles() files: { photos?: MulterFile[] },
    @Body() bikeData: UpdateBikeDto,
  ): Promise<Bike> {
    // если пришли новые фото — дописываем их к imageUrls
    if (files.photos?.length) {
      const baseUrl = this.configService.get<string>('baseUrl');
      const urls = files.photos.map((f) => `${baseUrl}/uploads/bikes/${f.filename}`);
      bikeData.imageUrls = [...((bikeData.imageUrls as string[]) || []), ...urls];
    }

    // парсим prices из строки, если нужно
    if (typeof bikeData.prices === 'string') {
      try {
        const parsed = JSON.parse(bikeData.prices);
        bikeData.prices = plainToInstance(BikePriceDto, Array.isArray(parsed) ? parsed : [parsed], {
          excludeExtraneousValues: true,
        });
      } catch {
        bikeData.prices = [];
      }
    }

    // парсим translations из строки, если нужно
    if (typeof bikeData.translations === 'string') {
      try {
        const parsed = JSON.parse(bikeData.translations);
        bikeData.translations = plainToInstance(
          CreateBikeTranslationDto,
          Array.isArray(parsed) ? parsed : [parsed],
          { excludeExtraneousValues: true },
        );
      } catch {
        bikeData.translations = [];
      }
    }

    // теперь обновляем
    return this.bikeService.updateBike(id, bikeData);
  }

  @Auth(RoleIds.Admin)
  @Delete(':id')
  async deleteBike(@Param('id') id: number): Promise<void> {
    return this.bikeService.deleteBike(id);
  }
}
