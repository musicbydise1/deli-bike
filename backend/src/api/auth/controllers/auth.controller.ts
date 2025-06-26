import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/auth.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { File as MulterFile } from 'multer'; // Переименование типового File -> MulterFile, чтобы не конфликтовало с другими классами

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sendCode')
  sendCode(@Body('phoneNumber') phoneNumber: string) {
    return this.authService.sendCode(phoneNumber);
  }

  @Post('login')
  login(@Body() user: { phoneNumber: string; code: string }) {
    return this.authService.login(user);
  }

  /**
   * Эндпоинт для регистрации с загрузкой фотографий удостоверения:
   * - photoIdFront (передняя сторона)
   * - photoIdBack (задняя сторона)
   */
  @Post('register')
  @UseInterceptors(
      FileFieldsInterceptor(
          [
            { name: 'photoIdFront', maxCount: 1 },
            { name: 'photoIdBack', maxCount: 1 },
          ],
          {
            storage: diskStorage({
              destination: './uploads/users',
              filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtName = extname(file.originalname);
                const filename = `user-${uniqueSuffix}${fileExtName}`;
                callback(null, filename);
              },
            }),
            fileFilter: (req, file, callback) => {
              if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
              }
              callback(null, true);
            },
          },
      ),
  )
  async register(
      @UploadedFiles()
          files: {
        photoIdFront?: MulterFile[];
        photoIdBack?: MulterFile[];
      },
      @Body() user: RegisterDto,
  ) {
    // Если загружена передняя сторона удостоверения
    if (files.photoIdFront && files.photoIdFront.length > 0) {
      const fileFront = files.photoIdFront[0];
      // Формируем URL для хранения пути к файлу в БД
      const baseUrl = this.configService.get<string>('baseUrl');
      user.idCardFrontImage = `${baseUrl}/uploads/users/${fileFront.filename}`;
    }

    // Если загружена задняя сторона удостоверения
    if (files.photoIdBack && files.photoIdBack.length > 0) {
      const fileBack = files.photoIdBack[0];
      const baseUrl = this.configService.get<string>('baseUrl');
      user.idCardBackImage = `${baseUrl}/uploads/users/${fileBack.filename}`;
    }

    return this.authService.register(user);
  }

  // Остальные методы
  @Post('other-login')
  otherLogin(@Body() user: { email: string; password: string }) {
    return this.authService.otherLogin(user);
  }
}