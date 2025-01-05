import { IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsOptional()
  public patronymic?: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsOptional()
  public phoneNumber?: string;

  @IsOptional()
  public companyName?: string;

  @IsOptional()
  public iin?: string;

  @IsOptional()
  public idCardNumber?: string;

  @IsOptional()
  public idCardFrontImage?: string;

  @IsOptional()
  public idCardBackImage?: string;

  @IsEnum(['courier', 'corporate'])
  public role: 'courier' | 'corporate';
}

export class PayloadDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public id: number;
}