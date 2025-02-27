import { IsNotEmpty, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class BikePriceDto {
    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}

export class CreateBikeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    model: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsArray()
    imageUrls?: string[];

    @IsOptional()
    @IsNumber()
    maxSpeed?: number;

    @IsOptional()
    @IsNumber()
    rangePerCharge?: number;

    @IsOptional()
    chargeTime?: string;

    @IsOptional()
    @IsNumber()
    maxLoad?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    power?: string;

    @IsOptional()
    suspension?: string;

    @IsOptional()
    @IsArray()
    tags?: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BikePriceDto)
    prices: BikePriceDto[];
}