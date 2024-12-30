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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../role/enum/role.enum");
const product_dto_1 = require("../dto/product.dto");
const product_service_1 = require("../services/product.service");
const auth_decorator_1 = require("../../auth/guards/auth.decorator");
const findOneParams_dto_1 = require("../../../common/helper/findOneParams.dto");
const user_decorator_1 = require("../../auth/guards/user.decorator");
const user_entity_1 = require("../../../database/entities/user.entity");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProduct(product) {
        return this.productService.getProduct(product.id);
    }
    async createProduct(body, user) {
        return this.productService.createProduct(body, user.id);
    }
    async addProductDetails(product, body, user) {
        return this.productService.addProductDetails(product.id, body, user.id);
    }
    async activateProduct(product, user) {
        return this.productService.activateProduct(product.id, user.id);
    }
    async deleteProduct(product, user) {
        return this.productService.deleteProduct(product.id, user.id);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_dto_1.FindOneParams]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, auth_decorator_1.Auth)(role_enum_1.RoleIds.Admin, role_enum_1.RoleIds.Merchant),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, auth_decorator_1.Auth)(role_enum_1.RoleIds.Admin, role_enum_1.RoleIds.Merchant),
    (0, common_1.Post)(':id/details'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_dto_1.FindOneParams,
        product_dto_1.ProductDetailsDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProductDetails", null);
__decorate([
    (0, auth_decorator_1.Auth)(role_enum_1.RoleIds.Admin, role_enum_1.RoleIds.Merchant),
    (0, common_1.Post)(':id/activate'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_dto_1.FindOneParams,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "activateProduct", null);
__decorate([
    (0, auth_decorator_1.Auth)(role_enum_1.RoleIds.Admin, role_enum_1.RoleIds.Merchant),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_dto_1.FindOneParams,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map