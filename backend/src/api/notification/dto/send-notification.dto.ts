import { IsNotEmpty, IsNumber, IsString, IsEnum } from "class-validator";

export class SendNotificationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(["payment", "rental", "system"], {
    message: "Invalid notification type",
  })
  type: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
