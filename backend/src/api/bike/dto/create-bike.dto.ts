import { IsNotEmpty, IsOptional, IsNumber, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBikeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    model: string;

    @IsOptional()
    description?: string;

    @Transform(({ value }) => parseFloat(value)) // Преобразование в число
    @IsNumber({}, { message: 'pricePerHour must be a valid number with up to 2 decimal places.' })
    pricePerHour: number;

    @Transform(({ value }) => parseFloat(value)) // Преобразование в число
    @IsNumber({}, { message: 'pricePerDay must be a valid number with up to 2 decimal places.' })
    pricePerDay: number;

    @IsOptional()
    @IsArray()
    imageUrls?: string[];
}