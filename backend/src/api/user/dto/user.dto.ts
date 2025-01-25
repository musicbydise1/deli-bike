import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {Role} from "../../../database/entities/role.entity";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UserDto {

  @Expose()
  public id: number;

  @Expose()
  public email: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public patronymic?: string;

  @Expose()
  public phoneNumber?: string;

  @Expose()
  public companyName?: string;

  @Expose()
  public iin?: string;

  @Expose()
  public idCardNumber?: string;

  @Expose()
  public idCardFrontImage?: string;

  @Expose()
  public idCardBackImage?: string;

  @Expose()
  public isVerified: boolean;

  @Expose()
  public mfaEnabled: boolean;

  @Expose()
  public profileImage?: string;

  @Expose()
  public address?: string;

  @Expose()
  public walletBalance: number;

  @Expose()
  public subscriptionType?: string;

  @Expose()
  public preferredCurrency: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public roles: { id: number; name: string }[];
}