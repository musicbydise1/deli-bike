import { MaintenanceService } from '../services/maintenance.service';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../dto/update-maintenance.dto';
import { Maintenance } from '../entities/maintenance.entity';
export declare class MaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    createMaintenance(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance>;
    updateMaintenance(id: number, updateMaintenanceDto: UpdateMaintenanceDto): Promise<Maintenance>;
    deleteMaintenance(id: number): Promise<void>;
    getMaintenanceByBike(bikeId: number): Promise<Maintenance[]>;
    getAllMaintenance(): Promise<Maintenance[]>;
}
