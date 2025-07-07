import { IsString, Length } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @Length(1, 10)
  code: string;
}
