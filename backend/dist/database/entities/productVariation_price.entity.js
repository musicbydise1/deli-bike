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
exports.ProductVariationPrice = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("./country.entity");
const currency_entity_1 = require("./currency.entity");
const productVariation_entity_1 = require("./productVariation.entity");
let ProductVariationPrice = class ProductVariationPrice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductVariationPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productVariation_entity_1.ProductVariation),
    (0, typeorm_1.JoinColumn)({ name: 'productVariationId' }),
    __metadata("design:type", productVariation_entity_1.ProductVariation)
], ProductVariationPrice.prototype, "productVariation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ProductVariationPrice.prototype, "productVariationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country),
    (0, typeorm_1.JoinColumn)({ name: 'countryCode' }),
    __metadata("design:type", country_entity_1.Country)
], ProductVariationPrice.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 7 }),
    __metadata("design:type", String)
], ProductVariationPrice.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => currency_entity_1.Currency),
    (0, typeorm_1.JoinColumn)({ name: 'currencyCode' }),
    __metadata("design:type", currency_entity_1.Currency)
], ProductVariationPrice.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 7 }),
    __metadata("design:type", String)
], ProductVariationPrice.prototype, "currencyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ProductVariationPrice.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductVariationPrice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductVariationPrice.prototype, "updatedAt", void 0);
ProductVariationPrice = __decorate([
    (0, typeorm_1.Entity)()
], ProductVariationPrice);
exports.ProductVariationPrice = ProductVariationPrice;
//# sourceMappingURL=productVariation_price.entity.js.map