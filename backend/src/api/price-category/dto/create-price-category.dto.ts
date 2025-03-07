import { IsString, Length } from 'class-validator';

export class CreatePriceCategoryDto {
    @IsString()
    @Length(1, 255)
    readonly name: string;
}