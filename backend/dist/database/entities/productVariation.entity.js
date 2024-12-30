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
exports.ProductVariation = void 0;
const typeorm_1 = require("typeorm");
const color_entity_1 = require("./color.entity");
const product_entity_1 = require("./product.entity");
const size_entity_1 = require("./size.entity");
let ProductVariation = class ProductVariation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductVariation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", product_entity_1.Product)
], ProductVariation.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ProductVariation.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => size_entity_1.Size),
    (0, typeorm_1.JoinColumn)({ name: 'sizeCode' }),
    __metadata("design:type", size_entity_1.Size)
], ProductVariation.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 7 }),
    __metadata("design:type", String)
], ProductVariation.prototype, "sizeCode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => color_entity_1.Color),
    (0, typeorm_1.JoinColumn)({ name: 'colorName' }),
    __metadata("design:type", color_entity_1.Color)
], ProductVariation.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], ProductVariation.prototype, "colorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [] }),
    __metadata("design:type", Array)
], ProductVariation.prototype, "imageUrls", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductVariation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductVariation.prototype, "updatedAt", void 0);
ProductVariation = __decorate([
    (0, typeorm_1.Entity)()
], ProductVariation);
exports.ProductVariation = ProductVariation;
//# sourceMappingURL=productVariation.entity.js.map