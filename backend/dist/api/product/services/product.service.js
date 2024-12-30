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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const category_entity_1 = require("../../../database/entities/category.entity");
const product_entity_1 = require("../../../database/entities/product.entity");
const custom_1 = require("../../../errors/custom");
const class_validator_1 = require("class-validator");
const sucess_response_interceptor_1 = require("../../../common/helper/sucess-response.interceptor");
let ProductService = class ProductService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async getProduct(productId) {
        const product = await this.entityManager.findOne(product_entity_1.Product, {
            where: {
                id: productId,
            },
        });
        if (!product)
            throw new common_1.NotFoundException(custom_1.errorMessages.product.notFound);
        return product;
    }
    async createProduct(data, merchantId) {
        const category = await this.entityManager.findOne(category_entity_1.Category, {
            where: {
                id: data.categoryId,
            },
        });
        if (!category)
            throw new common_1.NotFoundException(custom_1.errorMessages.category.notFound);
        const product = await this.entityManager.create(product_entity_1.Product, {
            category,
            merchantId,
        });
        return this.entityManager.save(product);
    }
    async addProductDetails(productId, body, merchantId) {
        const result = await this.entityManager
            .createQueryBuilder()
            .update(product_entity_1.Product)
            .set(Object.assign({}, body))
            .where('id = :id', { id: productId })
            .andWhere('merchantId = :merchantId', { merchantId })
            .returning(['id'])
            .execute();
        if (result.affected < 1)
            throw new common_1.NotFoundException(custom_1.errorMessages.product.notFound);
        return result.raw[0];
    }
    async activateProduct(productId, merchantId) {
        if (!(await this.validate(productId)))
            throw new common_1.ConflictException(custom_1.errorMessages.product.notFulfilled);
        const result = await this.entityManager
            .createQueryBuilder()
            .update(product_entity_1.Product)
            .set({
            isActive: true,
        })
            .where('id = :id', { id: productId })
            .andWhere('merchantId = :merchantId', { merchantId })
            .returning(['id', 'isActive'])
            .execute();
        return result.raw[0];
    }
    async validate(productId) {
        const product = await this.entityManager.findOne(product_entity_1.Product, {
            where: {
                id: productId,
            },
        });
        if (!product)
            throw new common_1.NotFoundException(custom_1.errorMessages.product.notFound);
        const errors = await (0, class_validator_1.validate)(product);
        if (errors.length > 0)
            return false;
        return true;
    }
    async deleteProduct(productId, merchantId) {
        const result = await this.entityManager
            .createQueryBuilder()
            .delete()
            .from(product_entity_1.Product)
            .where('id = :productId', { productId })
            .andWhere('merchantId = :merchantId', { merchantId })
            .execute();
        if (result.affected < 1)
            throw new common_1.NotFoundException(custom_1.errorMessages.product.notFound);
        return sucess_response_interceptor_1.successObject;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map