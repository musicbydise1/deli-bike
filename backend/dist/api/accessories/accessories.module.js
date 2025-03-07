"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accessory_entity_1 = require("./entities/accessory.entity");
const accessories_service_1 = require("./services/accessories.service");
const accessories_controller_1 = require("./controllers/accessories.controller");
const bike_entity_1 = require("../bike/entities/bike.entity");
let AccessoriesModule = class AccessoriesModule {
};
AccessoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([accessory_entity_1.Accessory, bike_entity_1.Bike])],
        providers: [accessories_service_1.AccessoriesService],
        controllers: [accessories_controller_1.AccessoriesController],
        exports: [accessories_service_1.AccessoriesService],
    })
], AccessoriesModule);
exports.AccessoriesModule = AccessoriesModule;
//# sourceMappingURL=accessories.module.js.map