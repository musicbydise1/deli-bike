import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor, LogLevel } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const logLevels = (configService.get<string>('logLevels') || 'log,error,warn').split(
    ',',
  ) as LogLevel[];
  app.useLogger(logLevels);

  // Включение глобальной валидации
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: false,
      // forbidNonWhitelisted: false,
      // transformOptions: { enableImplicitConversion: true }, // excludeExtraneousValues не указываем
    }),
  );

  // Включение CORS
  app.enableCors({
    origin: [
      'https://deli-bike-test.vercel.app',
      'https://deli-bike.kz',
      'http://84.252.157.215',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Настройка статической выдачи файлов из папки uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(4000);
}
bootstrap();
