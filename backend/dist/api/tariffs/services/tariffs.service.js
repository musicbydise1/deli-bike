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
exports.TariffsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tariff_entity_1 = require("../entities/tariff.entity");
let TariffsService = class TariffsService {
    constructor(tariffRepository) {
        this.tariffRepository = tariffRepository;
    }
    async findAll() {
        return this.tariffRepository.find();
    }
    async findById(id) {
        const tariff = await this.tariffRepository.findOne({ where: { id } });
        if (!tariff) {
            throw new common_1.NotFoundException(`Tariff with ID ${id} not found`);
        }
        return tariff;
    }
    async createTariff(dto) {
        const tariff = this.tariffRepository.create(dto);
        return this.tariffRepository.save(tariff);
    }
    async updateTariff(id, dto) {
        const tariff = await this.findById(id);
        Object.assign(tariff, dto);
        return this.tariffRepository.save(tariff);
    }
    async deleteTariff(id) {
        await this.tariffRepository.delete(id);
    }
};
TariffsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tariff_entity_1.Tariff)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TariffsService);
exports.TariffsService = TariffsService;
//# sourceMappingURL=tariffs.service.js.map