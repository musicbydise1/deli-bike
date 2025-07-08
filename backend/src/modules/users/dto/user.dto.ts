import { Expose } from 'class-transformer';

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
  public telegramChatId?: string;

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
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public roles: { id: number; name: string }[];
}
