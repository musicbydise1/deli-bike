import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: any) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }
}