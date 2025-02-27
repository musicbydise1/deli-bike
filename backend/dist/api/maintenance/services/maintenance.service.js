"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const maintenance_entity_1 = require("../entities/maintenance.entity");
let MaintenanceService = class MaintenanceService {
    constructor(maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }
    async createMaintenance(createMaintenanceDto) {
        const { bikeId, serviceDate, description, status } = createMaintenanceDto;
        const maintenance = this.maintenanceRepository.create({
            bike: { id: bikeId },
            serviceDate: new Date(serviceDate),
            description,
            status,
        });
        return this.maintenanceRepository.save(maintenance);
    }
    async updateMaintenance(id, updateMaintenanceDto) {
        const maintenance = await this.maintenanceRepository.findOne({ where: { id } });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Maintenance with ID ${id} not found`);
        }
        Object.assign(maintenance, updateMaintenanceDto);
        return this.maintenanceRepository.save(maintenance);
    }
    async deleteMaintenance(id) {
        const maintenance = await this.maintenanceRepository.findOne({ where: { id } });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Maintenance with ID ${id} not found`);
        }
        await this.maintenanceRepository.remove(maintenance);
    }
    async getMaintenanceByBike(bikeId) {
        return this.maintenanceRepository.find({ where: { bike: { id: bikeId } } });
    }
    async getAllMaintenance() {
        return this.maintenanceRepository.find({ relations: ['bike'] });
    }
};
MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(maintenance_entity_1.Maintenance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MaintenanceService);
exports.MaintenanceService = MaintenanceService;
//# sourceMappingURL=maintenance.service.js.map