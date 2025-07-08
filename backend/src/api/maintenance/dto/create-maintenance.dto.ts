import { IsNotEmpty, IsDateString, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateMaintenanceDto {
  @IsNotEmpty()
  bikeId: number;

  @IsNotEmpty()
  @IsDateString()
  serviceDate: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['scheduled', 'in_progress', 'completed'], {
    message: 'Invalid status',
  })
  status?: 'scheduled' | 'in_progress' | 'completed';
}
