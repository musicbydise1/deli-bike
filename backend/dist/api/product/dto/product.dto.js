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
exports.ProductDetailsDto = exports.CreateProductDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const product_entity_1 = require("../../../database/entities/product.entity");
const productDetails_1 = require("./productDetails");
class CreateProductDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "categoryId", void 0);
exports.CreateProductDto = CreateProductDto;
class ProductDetailsDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDetailsDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDetailsDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(product_entity_1.variationTypesKeys),
    __metadata("design:type", String)
], ProductDetailsDto.prototype, "variationType", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(productDetails_1.ProductDetailsTypeFn),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], ProductDetailsDto.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductDetailsDto.prototype, "about", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDetailsDto.prototype, "description", void 0);
exports.ProductDetailsDto = ProductDetailsDto;
//# sourceMappingURL=product.dto.js.map