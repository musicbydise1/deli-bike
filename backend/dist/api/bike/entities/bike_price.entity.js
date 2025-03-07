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
exports.BikePrice = void 0;
const typeorm_1 = require("typeorm");
const bike_entity_1 = require("./bike.entity");
const price_category_entity_1 = require("../../price-category/entities/price-category.entity");
let BikePrice = class BikePrice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BikePrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bike_entity_1.Bike, (bike) => bike.prices, { onDelete: 'CASCADE' }),
    __metadata("design:type", bike_entity_1.Bike)
], BikePrice.prototype, "bike", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => price_category_entity_1.PriceCategory, { onDelete: 'CASCADE' }),
    __metadata("design:type", price_category_entity_1.PriceCategory)
], BikePrice.prototype, "priceCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BikePrice.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt', type: 'timestamp' }),
    __metadata("design:type", Date)
], BikePrice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt', type: 'timestamp' }),
    __metadata("design:type", Date)
], BikePrice.prototype, "updatedAt", void 0);
BikePrice = __decorate([
    (0, typeorm_1.Entity)('bike_price')
], BikePrice);
exports.BikePrice = BikePrice;
//# sourceMappingURL=bike_price.entity.js.map