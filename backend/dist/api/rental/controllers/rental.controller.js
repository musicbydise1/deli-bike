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
exports.RentalController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const rental_service_1 = require("../services/rental.service");
const create_rental_dto_1 = require("../dto/create-rental.dto");
let RentalController = class RentalController {
    constructor(rentalService) {
        this.rentalService = rentalService;
    }
    async createRental(createRentalDto) {
        return this.rentalService.createRental(createRentalDto);
    }
    async completeRental(id) {
        return this.rentalService.completeRental(id);
    }
    async getAllRentals() {
        return this.rentalService.getAllRentals();
    }
    async getActiveRentals() {
        return this.rentalService.getActiveRentals();
    }
    async getRentalsByUser(userId) {
        return this.rentalService.getRentalsByUser(userId);
    }
    async getUserRentalHistory(userId) {
        return this.rentalService.getUserRentalHistory(userId);
    }
    async cancelRental(id) {
        return this.rentalService.cancelRental(id);
    }
    async getRentalById(id) {
        return this.rentalService.getRentalById(id);
    }
    async checkBikeAvailability(bikeId) {
        return this.rentalService.isBikeAvailable(bikeId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rental_dto_1.CreateRentalDto]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "createRental", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "completeRental", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getAllRentals", null);
__decorate([
    (0, common_1.Get)('/active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getActiveRentals", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getRentalsByUser", null);
__decorate([
    (0, common_1.Get)('/user/:userId/history'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getUserRentalHistory", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "cancelRental", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getRentalById", null);
__decorate([
    (0, common_1.Get)('/bikes/:bikeId/availability'),
    __param(0, (0, common_1.Param)('bikeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "checkBikeAvailability", null);
RentalController = __decorate([
    (0, common_1.Controller)('rentals'),
    __metadata("design:paramtypes", [rental_service_1.RentalService])
], RentalController);
exports.RentalController = RentalController;
//# sourceMappingURL=rental.controller.js.map