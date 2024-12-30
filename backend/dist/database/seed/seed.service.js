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
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const bluebird_1 = require("bluebird");
const admin_seeder_1 = require("./seeders/admin.seeder");
const category_seeder_1 = require("./seeders/category.seeder");
const color_seeder_1 = require("./seeders/color.seeder");
const country_seeder_1 = require("./seeders/country.seeder");
const currency_seeder_1 = require("./seeders/currency.seeder");
const role_seeder_1 = require("./seeders/role.seeder");
const size_seeder_1 = require("./seeders/size.seeder");
let SeedService = SeedService_1 = class SeedService {
    constructor(rolesSeeder, adminSeeder, categoriesSeeder, sizesSeeder, colorsSeeder, countrySeeder, currencySeeder) {
        this.seeders = [];
        this.logger = new common_1.Logger(SeedService_1.name);
        this.seeders = [
            rolesSeeder,
            adminSeeder,
            categoriesSeeder,
            sizesSeeder,
            colorsSeeder,
            countrySeeder,
            currencySeeder,
        ];
    }
    async seed() {
        await bluebird_1.Promise.each(this.seeders, async (seeder) => {
            this.logger.log(`Seeding ${seeder.constructor.name}`);
            await seeder.seed();
        });
    }
};
SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_seeder_1.RolesSeeder,
        admin_seeder_1.AdminSeeder,
        category_seeder_1.CategorySeeder,
        size_seeder_1.SizeSeeder,
        color_seeder_1.ColorSeeder,
        country_seeder_1.CountrySeeder,
        currency_seeder_1.CurrencySeeder])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map