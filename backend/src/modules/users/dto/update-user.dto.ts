import { IsNotEmpty, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    lastName?: string;

    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;

    @IsOptional()
    @IsEnum(['active', 'blocked', 'deleted'], { message: 'Invalid status' })
    status?: 'active' | 'blocked' | 'deleted';
}