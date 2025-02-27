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
exports.Maintenance = void 0;
const typeorm_1 = require("typeorm");
const bike_entity_1 = require("../../bike/entities/bike.entity");
let Maintenance = class Maintenance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Maintenance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bike_entity_1.Bike, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'bikeId' }),
    __metadata("design:type", bike_entity_1.Bike)
], Maintenance.prototype, "bike", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], Maintenance.prototype, "serviceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['scheduled', 'in_progress', 'completed'],
        default: 'scheduled',
    }),
    __metadata("design:type", String)
], Maintenance.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Maintenance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Maintenance.prototype, "updatedAt", void 0);
Maintenance = __decorate([
    (0, typeorm_1.Entity)('maintenance')
], Maintenance);
exports.Maintenance = Maintenance;
//# sourceMappingURL=maintenance.entity.js.map