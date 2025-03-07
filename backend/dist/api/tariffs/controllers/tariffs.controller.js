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
exports.TariffsController = void 0;
const common_1 = require("@nestjs/common");
const tariffs_service_1 = require("../services/tariffs.service");
const tariff_dto_1 = require("../dto/tariff.dto");
let TariffsController = class TariffsController {
    constructor(tariffsService) {
        this.tariffsService = tariffsService;
    }
    async findAll() {
        return this.tariffsService.findAll();
    }
    async findById(id) {
        return this.tariffsService.findById(id);
    }
    async create(dto) {
        return this.tariffsService.createTariff(dto);
    }
    async update(id, dto) {
        return this.tariffsService.updateTariff(id, dto);
    }
    async delete(id) {
        return this.tariffsService.deleteTariff(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TariffsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TariffsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tariff_dto_1.CreateTariffDto]),
    __metadata("design:returntype", Promise)
], TariffsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tariff_dto_1.UpdateTariffDto]),
    __metadata("design:returntype", Promise)
], TariffsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TariffsController.prototype, "delete", null);
TariffsController = __decorate([
    (0, common_1.Controller)('tariffs'),
    __metadata("design:paramtypes", [tariffs_service_1.TariffsService])
], TariffsController);
exports.TariffsController = TariffsController;
//# sourceMappingURL=tariffs.controller.js.map