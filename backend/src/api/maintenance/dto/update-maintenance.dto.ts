import { IsOptional, IsDateString, IsString, IsEnum } from "class-validator";

export class UpdateMaintenanceDto {
  @IsOptional()
  @IsDateString()
  serviceDate?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(["scheduled", "in_progress", "completed"], {
    message: "Invalid status",
  })
  status?: "scheduled" | "in_progress" | "completed";
}
