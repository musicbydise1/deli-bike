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
exports.SizeSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const size_entity_1 = require("../../entities/size.entity");
const typeorm_2 = require("typeorm");
let SizeSeeder = class SizeSeeder {
    constructor(SizeRepository) {
        this.SizeRepository = SizeRepository;
    }
    async seed() {
        const data = this.generateData();
        await this.SizeRepository.upsert(data, {
            conflictPaths: ['code'],
        });
    }
    generateData() {
        const data = [];
        Object.keys(size_entity_1.SizeCodes).forEach((key) => {
            data.push({
                code: size_entity_1.SizeCodes[key],
            });
        });
        return data;
    }
};
SizeSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(size_entity_1.Size)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SizeSeeder);
exports.SizeSeeder = SizeSeeder;
//# sourceMappingURL=size.seeder.js.map