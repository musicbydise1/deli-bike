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
exports.BikeController = void 0;
const common_1 = require("@nestjs/common");
const bike_service_1 = require("../services/bike.service");
const create_bike_dto_1 = require("../dto/create-bike.dto");
let BikeController = class BikeController {
    constructor(bikeService) {
        this.bikeService = bikeService;
    }
    async getAllBikes() {
        return this.bikeService.findAll();
    }
    async getBikeById(id) {
        return this.bikeService.findOneById(id);
    }
    async createBike(bikeData) {
        return this.bikeService.createBike(bikeData);
    }
    async updateBike(id, bikeData) {
        return this.bikeService.updateBike(id, bikeData);
    }
    async deleteBike(id) {
        return this.bikeService.deleteBike(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getAllBikes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getBikeById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bike_dto_1.CreateBikeDto]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "createBike", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "updateBike", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "deleteBike", null);
BikeController = __decorate([
    (0, common_1.Controller)('bikes'),
    __metadata("design:paramtypes", [bike_service_1.BikeService])
], BikeController);
exports.BikeController = BikeController;
//# sourceMappingURL=bike.controller.js.map