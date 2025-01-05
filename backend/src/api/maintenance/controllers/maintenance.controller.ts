import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { MaintenanceService } from '../services/maintenance.service';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../dto/update-maintenance.dto';
import { Maintenance } from '../entities/maintenance.entity';

@Controller('maintenance')
export class MaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) {}

    @Post()
    async createMaintenance(@Body() createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
        return this.maintenanceService.createMaintenance(createMaintenanceDto);
    }

    @Patch(':id')
    async updateMaintenance(
        @Param('id') id: number,
        @Body() updateMaintenanceDto: UpdateMaintenanceDto,
    ): Promise<Maintenance> {
        return this.maintenanceService.updateMaintenance(id, updateMaintenanceDto);
    }

    @Delete(':id')
    async deleteMaintenance(@Param('id') id: number): Promise<void> {
        return this.maintenanceService.deleteMaintenance(id);
    }

    @Get('/bike/:bikeId')
    async getMaintenanceByBike(@Param('bikeId') bikeId: number): Promise<Maintenance[]> {
        return this.maintenanceService.getMaintenanceByBike(bikeId);
    }

    @Get()
    async getAllMaintenance(): Promise<Maintenance[]> {
        return this.maintenanceService.getAllMaintenance();
    }
}