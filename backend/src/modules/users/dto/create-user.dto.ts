import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  public phoneNumber: string;

  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsOptional()
  public patronymic?: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsOptional()
  public password?: string;

  @IsOptional()
  public companyName?: string;

  @IsOptional()
  public telegramChatId?: string;

  @IsOptional()
  public idCardNumber?: string;

  @IsOptional()
  public idCardFrontImage?: string;

  @IsOptional()
  public idCardBackImage?: string;

  // Роль пользователя: курьер или корпоративный клиент.
  @IsEnum(['courier', 'corporate'])
  public role: 'courier' | 'corporate';
}
