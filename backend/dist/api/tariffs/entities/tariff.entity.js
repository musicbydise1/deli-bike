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
exports.Tariff = void 0;
const typeorm_1 = require("typeorm");
const bike_entity_1 = require("../../bike/entities/bike.entity");
let Tariff = class Tariff {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tariff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tariff.prototype, "bikeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Tariff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Tariff.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: 'Продолжительность тарифа в днях' }),
    __metadata("design:type", Number)
], Tariff.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Tariff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Tariff.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bike_entity_1.Bike, bike => bike.tariffs, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'bikeId' }),
    __metadata("design:type", bike_entity_1.Bike)
], Tariff.prototype, "bike", void 0);
Tariff = __decorate([
    (0, typeorm_1.Entity)('tariffs')
], Tariff);
exports.Tariff = Tariff;
//# sourceMappingURL=tariff.entity.js.map