import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
  IsString,
} from "class-validator";
import { Type, Transform, Expose } from "class-transformer";

export enum AvailabilityStatus {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
}

export class CreateBikeTranslationDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  field: string; // "name" | "description" и т.д.

  @Expose()
  @IsNotEmpty()
  @IsString()
  language: string; // "ru", "en", ...

  @Expose()
  @IsNotEmpty()
  @IsString()
  translation: string; // Текст перевода
}

export class BikePriceDto {
  @Expose()
  @IsNotEmpty()
  categoryId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @Expose()
  @IsNotEmpty()
  roleId: number;

  @Expose()
  @IsNotEmpty()
  currencyId: number;
}

export class CreateBikeDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  model: string;

  @Expose()
  @IsOptional()
  @Transform(
    ({ value }) => {
      // Если приходит строка, пробуем распарсить как JSON или делим по запятой
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          return value.split(",").map((s: string) => s.trim());
        }
      }
      return value;
    },
    { toClassOnly: true }
  )
  @IsArray()
  imageUrls?: string[];

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stock?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  max_speed?: number;

  @Expose()
  @IsOptional()
  range_per_charge?: string;

  @Expose()
  @IsOptional()
  charge_time?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  max_load?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight?: number;

  @Expose()
  @IsOptional()
  power?: string;

  @Expose()
  @IsOptional()
  suspension?: string;

  @Expose()
  @IsOptional()
  brakes?: string;

  @Expose()
  @IsOptional()
  @Transform(
    ({ value }) =>
      typeof value === "string"
        ? value.split(",").map((t: string) => t.trim())
        : value,
    { toClassOnly: true }
  )
  @IsArray()
  tags?: string[];

  // Если клиент отправляет availability_status в snake_case, используем alias:
  @Expose({ name: "availability_status" })
  @IsEnum(AvailabilityStatus, { message: "Invalid availability status" })
  availabilityStatus: AvailabilityStatus;

  @Expose()
  @IsNotEmpty()
  // @IsOptional()
  // @Transform(({ value }) => {
  //     if (typeof value === 'string') {
  //         try {
  //             const parsed = JSON.parse(value);
  //             return Array.isArray(parsed) ? parsed : [];
  //         } catch (e) {
  //             return [];
  //         }
  //     }
  //     return value;
  // }, { toClassOnly: true })
  // @IsArray()
  // @ValidateNested({ each: true })
  @Type(() => BikePriceDto)
  prices: BikePriceDto[];

  @IsOptional()
  @Type(() => CreateBikeTranslationDto)
  translations?: CreateBikeTranslationDto[];
}
