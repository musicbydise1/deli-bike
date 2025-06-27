import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class CreatePriceCategoryTranslationDto {
  @IsString()
  @IsNotEmpty()
  field: string; // Например, "name" или "description"

  @IsString()
  @IsNotEmpty()
  language: string; // "ru", "en", ...

  @IsString()
  @IsNotEmpty()
  translation: string;
}

export class CreatePriceCategoryDto {
  @IsString()
  @Length(1, 255)
  readonly name: string;

  @IsInt()
  @Min(1)
  readonly rental_duration: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePriceCategoryTranslationDto)
  translations?: CreatePriceCategoryTranslationDto[];
}
