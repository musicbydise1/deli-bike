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
exports.PriceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const price_category_entity_1 = require("../entities/price-category.entity");
let PriceCategoryService = class PriceCategoryService {
    constructor(priceCategoryRepository) {
        this.priceCategoryRepository = priceCategoryRepository;
    }
    async create(createDto) {
        const category = this.priceCategoryRepository.create(createDto);
        return await this.priceCategoryRepository.save(category);
    }
    async findAll() {
        return await this.priceCategoryRepository.find();
    }
    async findOne(id) {
        const category = await this.priceCategoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException(`Price category with id ${id} not found`);
        }
        return category;
    }
    async update(id, updateDto) {
        await this.priceCategoryRepository.update(id, updateDto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.priceCategoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Price category with id ${id} not found`);
        }
    }
};
PriceCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(price_category_entity_1.PriceCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PriceCategoryService);
exports.PriceCategoryService = PriceCategoryService;
//# sourceMappingURL=price-category.service.js.map