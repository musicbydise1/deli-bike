import { IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  // Обязательное поле — номер телефона (ранее было phoneNumber, теперь называем phone)
  @IsNotEmpty()
  public phoneNumber: string;

  // Обязательное поле — SMS-код подтверждения, полученный пользователем
  @IsNotEmpty()
  public code: string;

  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsOptional()
  public patronymic?: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  // Если логика авторизации полностью по SMS-коду, пароль может не использоваться.
  // Если же пароль нужен для корпоративных клиентов или в иных случаях — можно оставить его как опциональное поле.
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

export class PayloadDto {
  @IsNotEmpty()
  public id: number;

  // В новом случае для токена используется номер телефона
  @IsNotEmpty()
  public phone: string;
}