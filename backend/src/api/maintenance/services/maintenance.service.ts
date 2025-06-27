import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Maintenance } from "../entities/maintenance.entity";
import { CreateMaintenanceDto } from "../dto/create-maintenance.dto";
import { UpdateMaintenanceDto } from "../dto/update-maintenance.dto";

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private maintenanceRepository: Repository<Maintenance>
  ) {}

  async createMaintenance(
    createMaintenanceDto: CreateMaintenanceDto
  ): Promise<Maintenance> {
    const { bikeId, serviceDate, description, status } = createMaintenanceDto;

    const maintenance = this.maintenanceRepository.create({
      bike: { id: bikeId }, // Убедитесь, что здесь передаётся объект с ID
      serviceDate: new Date(serviceDate),
      description,
      status,
    });

    return this.maintenanceRepository.save(maintenance);
  }

  async updateMaintenance(
    id: number,
    updateMaintenanceDto: UpdateMaintenanceDto
  ): Promise<Maintenance> {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
    });
    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    Object.assign(maintenance, updateMaintenanceDto);
    return this.maintenanceRepository.save(maintenance);
  }

  async deleteMaintenance(id: number): Promise<void> {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
    });
    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    await this.maintenanceRepository.remove(maintenance);
  }

  async getMaintenanceByBike(bikeId: number): Promise<Maintenance[]> {
    return this.maintenanceRepository.find({ where: { bike: { id: bikeId } } });
  }

  async getAllMaintenance(): Promise<Maintenance[]> {
    return this.maintenanceRepository.find({ relations: ["bike"] });
  }
}
