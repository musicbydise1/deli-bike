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
import { BikeService } from '../services/bike.service';
import { Bike } from '../entities/bike.entity';
import {CreateBikeDto, CreateBikeTranslationDto} from '../dto/create-bike.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { File as MulterFile } from 'multer';
import { plainToInstance } from 'class-transformer';
import { BikePriceDto } from '../dto/create-bike.dto';

@Controller('bikes')
export class BikeController {
    constructor(private readonly bikeService: BikeService) {}

    @Get()
    async getAllBikes(): Promise<Bike[]> {
        return this.bikeService.findAll();
    }

    @Get(':id')
    async getBikeById(@Param('id') id: number): Promise<Bike> {
        return this.bikeService.findOneById(id);
    }

    // Эндпоинт для создания велосипеда с загрузкой фотографий
    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'photos', maxCount: 5 }], {
            storage: diskStorage({
                destination: './uploads/bikes',
                filename: (req, file, callback) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
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
        console.log('--- Raw bikeData (before manual parse) ---');
        console.log(JSON.stringify(bikeData, null, 2));

        if (files.photos && files.photos.length > 0) {
            bikeData.imageUrls = files.photos.map(
                (file) => `http://localhost:4000/uploads/bikes/${file.filename}`,
            );
        }

        // Логируем bikeData.prices и bikeData.translations, чтобы понять, что там
        console.log('bikeData.prices:', bikeData.prices);
        console.log('bikeData.translations:', bikeData.translations);

        // Если prices строка — парсим
        if (typeof bikeData.prices === 'string') {
            console.log('prices is string, try parse JSON');
            try {
                const parsed = JSON.parse(bikeData.prices);
                console.log('prices parsed:', parsed);
                bikeData.prices = plainToInstance(BikePriceDto, Array.isArray(parsed) ? parsed : [parsed], {
                    excludeExtraneousValues: true,
                });
            } catch (e) {
                console.log('Error parsing prices JSON:', e);
                bikeData.prices = [];
            }
        }

        // Если translations строка — парсим
        if (typeof bikeData.translations === 'string') {
            console.log('translations is string, try parse JSON');
            try {
                const parsed = JSON.parse(bikeData.translations);
                console.log('translations parsed:', parsed);
                bikeData.translations = plainToInstance(
                    CreateBikeTranslationDto,
                    Array.isArray(parsed) ? parsed : [parsed],
                    { excludeExtraneousValues: true },
                );
            } catch (e) {
                console.log('Error parsing translations JSON:', e);
                bikeData.translations = [];
            }
        }

        // После парсинга смотрим, что в bikeData
        console.log('--- bikeData after manual parse ---');
        console.log(JSON.stringify(bikeData, null, 2));

        return this.bikeService.createBike(bikeData);
    }


    @Put(':id')
    async updateBike(
        @Param('id') id: number,
        @Body() bikeData: Partial<CreateBikeDto>,
    ): Promise<Bike> {
        return this.bikeService.updateBike(id, bikeData);
    }

    @Delete(':id')
    async deleteBike(@Param('id') id: number): Promise<void> {
        return this.bikeService.deleteBike(id);
    }
}