import { IsNotEmpty, IsOptional, IsNumber, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccessoryDto {
    @IsNotEmpty()
    @IsArray()
    @Type(() => Number)
    bikeId: number[];  // теперь массив чисел

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
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