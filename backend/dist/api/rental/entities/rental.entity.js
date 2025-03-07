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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../database/entities/user.entity");
const bike_entity_1 = require("../../bike/entities/bike.entity");
let Rental = class Rental {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rental.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Rental.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bike_entity_1.Bike, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'bikeId' }),
    __metadata("design:type", bike_entity_1.Bike)
], Rental.prototype, "bike", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], Rental.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], Rental.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Rental.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['on_payment', 'active', 'completed', 'cancelled'], default: 'on_payment' }),
    __metadata("design:type", String)
], Rental.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rental.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Rental.prototype, "updatedAt", void 0);
Rental = __decorate([
    (0, typeorm_1.Entity)('rental')
], Rental);
exports.Rental = Rental;
//# sourceMappingURL=rental.entity.js.map