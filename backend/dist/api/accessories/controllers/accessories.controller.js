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
exports.AccessoriesController = void 0;
const common_1 = require("@nestjs/common");
const accessories_service_1 = require("../services/accessories.service");
const accessory_dto_1 = require("../dto/accessory.dto");
let AccessoriesController = class AccessoriesController {
    constructor(accessoriesService) {
        this.accessoriesService = accessoriesService;
    }
    async findAll() {
        return this.accessoriesService.findAll();
    }
    async findById(id) {
        return this.accessoriesService.findById(id);
    }
    async create(dto) {
        console.log(dto);
        return this.accessoriesService.createAccessory(dto);
    }
    async update(id, dto) {
        return this.accessoriesService.updateAccessory(id, dto);
    }
    async delete(id) {
        return this.accessoriesService.deleteAccessory(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accessory_dto_1.CreateAccessoryDto]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, accessory_dto_1.UpdateAccessoryDto]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "delete", null);
AccessoriesController = __decorate([
    (0, common_1.Controller)('accessories'),
    __metadata("design:paramtypes", [accessories_service_1.AccessoriesService])
], AccessoriesController);
exports.AccessoriesController = AccessoriesController;
//# sourceMappingURL=accessories.controller.js.map