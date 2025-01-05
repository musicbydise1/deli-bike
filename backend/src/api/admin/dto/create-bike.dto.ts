import { IsNotEmpty, IsNumber, IsString, IsArray, IsEnum } from 'class-validator';

export class CreateBikeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    pricePerHour: number;

    @IsNotEmpty()
    @IsNumber()
    pricePerDay: number;

    @IsArray()
    @IsString({ each: true })
    imageUrls: string[];

    @IsNotEmpty()
    @IsEnum(['available', 'unavailable'], { message: 'Invalid availability status' })
    availabilityStatus: 'available' | 'unavailable';
}