import {
    IsNotEmpty,
    IsOptional,
    IsArray,
    ValidateNested,
    IsNumber,
    IsEnum,
} from 'class-validator';
import { Type, Transform, Expose } from 'class-transformer';

export enum AvailabilityStatus {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
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
    description?: string;

    @Expose()
    @IsOptional()
    @Transform(({ value }) => {
        // Если приходит строка, пробуем распарсить как JSON или делим по запятой
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                return value.split(',').map((s: string) => s.trim());
            }
        }
        return value;
    }, { toClassOnly: true })
    @IsArray()
    imageUrls?: string[];

    @Expose()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxSpeed?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    rangePerCharge?: number;

    @Expose()
    @IsOptional()
    chargeTime?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxLoad?: number;

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
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',').map((t: string) => t.trim()) : value), { toClassOnly: true })
    @IsArray()
    tags?: string[];

    // Если клиент отправляет availability_status в snake_case, используем alias:
    @Expose({ name: 'availability_status' })
    @IsEnum(AvailabilityStatus, { message: 'Invalid availability status' })
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
}