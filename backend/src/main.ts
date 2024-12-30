import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включение глобальной валидации
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Включение CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL вашего фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные HTTP-методы
    credentials: true, // Для работы с куки (если нужно)
  });

  await app.listen(4000);
}
bootstrap();
