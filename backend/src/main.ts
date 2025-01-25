import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включение глобальной валидации
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true, // Убирает лишние поля из входных данных
        forbidNonWhitelisted: true, // Запрещает неразрешённые поля
      }),
  );

  // Включение CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL вашего фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные HTTP-методы
    credentials: true, // Для работы с куки (если нужно)
  });

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


    await app.listen(4000);
}
bootstrap();
