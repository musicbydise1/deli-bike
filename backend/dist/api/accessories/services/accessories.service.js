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
exports.AccessoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const accessory_entity_1 = require("../entities/accessory.entity");
let AccessoriesService = class AccessoriesService {
    constructor(accessoryRepository) {
        this.accessoryRepository = accessoryRepository;
    }
    async findAll() {
        return this.accessoryRepository.find({ relations: ['bike'] });
    }
    async findById(id) {
        const accessory = await this.accessoryRepository.findOne({ where: { id } });
        if (!accessory) {
            throw new common_1.NotFoundException(`Accessory with ID ${id} not found`);
        }
        return accessory;
    }
    async createAccessory(dto) {
        const accessories = [];
        const bikeIds = Array.isArray(dto.bikeId) ? dto.bikeId : [dto.bikeId];
        for (const id of bikeIds) {
            const accessory = new accessory_entity_1.Accessory();
            accessory.name = dto.name;
            accessory.description = dto.description;
            accessory.price = dto.price;
            accessory.bikeId = id;
            accessory.bike = { id };
            const saved = await this.accessoryRepository.save(accessory);
            accessories.push(saved);
        }
        return accessories;
    }
    async updateAccessory(id, dto) {
        const accessory = await this.findById(id);
        Object.assign(accessory, dto);
        return this.accessoryRepository.save(accessory);
    }
    async deleteAccessory(id) {
        await this.accessoryRepository.delete(id);
    }
};
AccessoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accessory_entity_1.Accessory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccessoriesService);
exports.AccessoriesService = AccessoriesService;
//# sourceMappingURL=accessories.service.js.map