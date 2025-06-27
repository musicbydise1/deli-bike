import { IsNotEmpty } from "class-validator";

export class PayloadDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  phone: string;
}
