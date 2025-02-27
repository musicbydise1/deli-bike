import { Repository } from 'typeorm';
import { Maintenance } from '../entities/maintenance.entity';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../dto/update-maintenance.dto';
export declare class MaintenanceService {
    private maintenanceRepository;
    constructor(maintenanceRepository: Repository<Maintenance>);
    createMaintenance(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance>;
    updateMaintenance(id: number, updateMaintenanceDto: UpdateMaintenanceDto): Promise<Maintenance>;
    deleteMaintenance(id: number): Promise<void>;
    getMaintenanceByBike(bikeId: number): Promise<Maintenance[]>;
    getAllMaintenance(): Promise<Maintenance[]>;
}
