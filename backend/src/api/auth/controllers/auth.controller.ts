import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Эндпоинт для отправки SMS-кода подтверждения
  @Post('sendCode')
  sendCode(@Body('phoneNumber') phoneNumber: string) {
    return this.authService.sendCode(phoneNumber);
  }

  // Эндпоинт для авторизации по телефону и коду
  @Post('login')
  login(@Body() user: { phoneNumber: string; code: string }) {
    return this.authService.login(user);
  }

  // Эндпоинт для регистрации
  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  // Новый эндпоинт для авторизации по email и password
  @Post('other-login')
  otherLogin(@Body() user: { email: string; password: string }) {
    return this.authService.otherLogin(user);
  }
}