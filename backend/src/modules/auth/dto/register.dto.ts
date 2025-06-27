import { IsNotEmpty, IsEmail, IsOptional, IsEnum } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  patronymic?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  companyName?: string;

  @IsOptional()
  telegramChatId?: string;

  @IsOptional()
  idCardNumber?: string;

  @IsOptional()
  idCardFrontImage?: string;

  @IsOptional()
  idCardBackImage?: string;

  @IsEnum(["courier", "corporate"])
  role: "courier" | "corporate";
}
