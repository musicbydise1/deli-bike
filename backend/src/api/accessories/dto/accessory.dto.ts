import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsString,
  ValidateNested,
} from "class-validator";
import { Expose, Type } from "class-transformer";

export class AccessoriesPriceDto {
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

export class CreateAccessoryTranslationDto {
  @IsNotEmpty()
  @IsString()
  field: string; // "name" | "description" и т.д.

  @IsNotEmpty()
  @IsString()
  language: string; // "ru", "en", ...

  @IsNotEmpty()
  @IsString()
  translation: string;
}

export class CreateAccessoryDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => Number)
  bikeId: number[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => AccessoriesPriceDto)
  prices: AccessoriesPriceDto[];

  // --- новое поле translations
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAccessoryTranslationDto)
  translations?: CreateAccessoryTranslationDto[];
}

export class UpdateAccessoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
