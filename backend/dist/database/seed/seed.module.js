"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("../../config");
const category_entity_1 = require("../entities/category.entity");
const role_entity_1 = require("../entities/role.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_service_1 = require("../typeorm/typeorm.service");
const color_entity_1 = require("../entities/color.entity");
const country_entity_1 = require("../entities/country.entity");
const currency_entity_1 = require("../entities/currency.entity");
const size_entity_1 = require("../entities/size.entity");
const seed_service_1 = require("./seed.service");
const admin_seeder_1 = require("./seeders/admin.seeder");
const category_seeder_1 = require("./seeders/category.seeder");
const color_seeder_1 = require("./seeders/color.seeder");
const country_seeder_1 = require("./seeders/country.seeder");
const currency_seeder_1 = require("./seeders/currency.seeder");
const role_seeder_1 = require("./seeders/role.seeder");
const size_seeder_1 = require("./seeders/size.seeder");
let SeedModule = class SeedModule {
};
SeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmConfigService }),
            typeorm_1.TypeOrmModule.forFeature([
                role_entity_1.Role,
                user_entity_1.User,
                category_entity_1.Category,
                size_entity_1.Size,
                color_entity_1.Color,
                country_entity_1.Country,
                currency_entity_1.Currency,
            ]),
            config_1.ConfigModule.forRoot({ load: [config_2.configuration], isGlobal: true }),
        ],
        controllers: [],
        providers: [
            seed_service_1.SeedService,
            role_seeder_1.RolesSeeder,
            admin_seeder_1.AdminSeeder,
            category_seeder_1.CategorySeeder,
            size_seeder_1.SizeSeeder,
            color_seeder_1.ColorSeeder,
            country_seeder_1.CountrySeeder,
            currency_seeder_1.CurrencySeeder,
        ],
    })
], SeedModule);
exports.SeedModule = SeedModule;
//# sourceMappingURL=seed.module.js.map