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
exports.variationTypesKeys = exports.VariationTypes = exports.Product = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const productDetails_1 = require("../../api/product/dto/productDetails");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const user_entity_1 = require("./user.entity");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "variationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [] }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], Product.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(productDetails_1.ProductDetailsTypeFn),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], Product.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "merchantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.products),
    (0, typeorm_1.JoinColumn)({ name: 'merchantId' }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
var VariationTypes;
(function (VariationTypes) {
    VariationTypes["NONE"] = "NONE";
    VariationTypes["OnlySize"] = "OnlySize";
    VariationTypes["OnlyColor"] = "OnlyColor";
    VariationTypes["SizeAndColor"] = "SizeAndColor";
})(VariationTypes = exports.VariationTypes || (exports.VariationTypes = {}));
exports.variationTypesKeys = Object.keys(VariationTypes);
//# sourceMappingURL=product.entity.js.map