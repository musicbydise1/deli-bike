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
exports.CategorySeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../entities/category.entity");
const typeorm_2 = require("typeorm");
let CategorySeeder = class CategorySeeder {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async seed() {
        const data = this.generateData();
        await this.categoriesRepository.upsert(data, {
            conflictPaths: ['id'],
        });
    }
    generateData() {
        const data = [];
        Object.keys(category_entity_1.Categories).forEach((key) => {
            data.push({
                id: category_entity_1.CategoryIds[key],
                name: category_entity_1.Categories[key],
            });
        });
        return data;
    }
};
CategorySeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategorySeeder);
exports.CategorySeeder = CategorySeeder;
//# sourceMappingURL=category.seeder.js.map