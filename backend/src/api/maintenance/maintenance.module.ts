import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { MaintenanceService } from './services/maintenance.service';
import { MaintenanceController } from './controllers/maintenance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Maintenance])],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
})
export class MaintenanceModule {}
