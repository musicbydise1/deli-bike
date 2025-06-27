import { IsNotEmpty, IsNumber, IsEnum, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  rentalId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsEnum(["pending", "completed", "failed"], {
    message: "Invalid payment status",
  })
  status: "pending" | "completed" | "failed";
}
