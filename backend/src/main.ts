import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // Импортируем NestExpressApplication
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule); // Указываем тип приложения

    // Включение глобальной валидации
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            // forbidNonWhitelisted: false,
            // transformOptions: { enableImplicitConversion: true }, // excludeExtraneousValues не указываем
        }),
    );

    // Включение CORS
    app.enableCors({
        origin: ['https://deli-bike-j5k8.vercel.app', 'http://localhost:3000'],
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