import { IsNotEmpty, IsDate, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class CreateRentalDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  bikeId: number;

  @IsNotEmpty()
  @IsNumber()
  priceCategoryId: number;

  @IsNotEmpty()
  @IsNumber()
  currency_id: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value)) // Преобразует строку в дату
  @IsDate({ message: "startDate must be a valid Date instance" })
  startDate: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value)) // Преобразует строку в дату
  @IsDate({ message: "endDate must be a valid Date instance" })
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
