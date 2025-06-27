import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  code: string;
}
