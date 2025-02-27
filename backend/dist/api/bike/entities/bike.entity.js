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
exports.Bike = void 0;
const typeorm_1 = require("typeorm");
const bike_price_entity_1 = require("./bike_price.entity");
let Bike = class Bike {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bike.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Bike.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Bike.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Bike.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'availability_status',
        type: 'enum',
        enum: ['available', 'unavailable', 'rented', 'maintenance'],
        default: 'available',
    }),
    __metadata("design:type", String)
], Bike.prototype, "availability_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_speed', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Bike.prototype, "maxSpeed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'range_per_charge', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Bike.prototype, "rangePerCharge", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'charge_time', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Bike.prototype, "chargeTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_load', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Bike.prototype, "maxLoad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Bike.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'power', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Bike.prototype, "power", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'suspension', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Bike.prototype, "suspension", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_urls', type: 'text', array: true, default: '{}' }),
    __metadata("design:type", Array)
], Bike.prototype, "imageUrls", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tags', type: 'text', array: true, default: '{}' }),
    __metadata("design:type", Array)
], Bike.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bike_price_entity_1.BikePrice, (bikePrice) => bikePrice.bike, { cascade: true }),
    __metadata("design:type", Array)
], Bike.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt', type: 'timestamp' }),
    __metadata("design:type", Date)
], Bike.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt', type: 'timestamp' }),
    __metadata("design:type", Date)
], Bike.prototype, "updatedAt", void 0);
Bike = __decorate([
    (0, typeorm_1.Entity)('bike')
], Bike);
exports.Bike = Bike;
//# sourceMappingURL=bike.entity.js.map