"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TariffsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tariff_entity_1 = require("./entities/tariff.entity");
const tariffs_service_1 = require("./services/tariffs.service");
const tariffs_controller_1 = require("./controllers/tariffs.controller");
let TariffsModule = class TariffsModule {
};
TariffsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tariff_entity_1.Tariff])],
        providers: [tariffs_service_1.TariffsService],
        controllers: [tariffs_controller_1.TariffsController],
        exports: [tariffs_service_1.TariffsService],
    })
], TariffsModule);
exports.TariffsModule = TariffsModule;
//# sourceMappingURL=tariffs.module.js.map