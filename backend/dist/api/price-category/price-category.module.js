"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const price_category_entity_1 = require("./entities/price-category.entity");
const price_category_service_1 = require("./services/price-category.service");
const price_category_controller_1 = require("./controller/price-category.controller");
let PriceCategoryModule = class PriceCategoryModule {
};
PriceCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([price_category_entity_1.PriceCategory])],
        controllers: [price_category_controller_1.PriceCategoryController],
        providers: [price_category_service_1.PriceCategoryService],
        exports: [price_category_service_1.PriceCategoryService],
    })
], PriceCategoryModule);
exports.PriceCategoryModule = PriceCategoryModule;
//# sourceMappingURL=price-category.module.js.map