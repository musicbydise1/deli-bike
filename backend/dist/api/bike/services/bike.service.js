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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bike_entity_1 = require("../entities/bike.entity");
const bike_price_entity_1 = require("../entities/bike_price.entity");
let BikeService = class BikeService {
    constructor(bikeRepository, bikePriceRepository) {
        this.bikeRepository = bikeRepository;
        this.bikePriceRepository = bikePriceRepository;
    }
    async findAll() {
        return this.bikeRepository.find({
            where: { availability_status: 'available' },
            relations: ['prices', 'prices.priceCategory'],
        });
    }
    async findOneById(id) {
        return this.bikeRepository.findOne({
            where: { id },
            relations: ['prices', 'prices.priceCategory'],
        });
    }
    async createBike(bikeData) {
        const { prices } = bikeData, bikeDetails = __rest(bikeData, ["prices"]);
        const bike = this.bikeRepository.create(bikeDetails);
        const savedBike = await this.bikeRepository.save(bike);
        if (prices && prices.length > 0) {
            const bikePrices = prices.map((price) => this.bikePriceRepository.create({
                bike: savedBike,
                priceCategory: { id: price.categoryId },
                price: price.price,
            }));
            await this.bikePriceRepository.save(bikePrices);
        }
        return savedBike;
    }
    async updateBike(id, bikeData) {
        const { prices } = bikeData, bikeDetails = __rest(bikeData, ["prices"]);
        await this.bikeRepository.update(id, bikeDetails);
        if (prices) {
            const currentPrices = await this.bikePriceRepository.find({
                where: { bike: { id } },
                relations: ['priceCategory'],
            });
            const currentPriceIds = currentPrices.map((price) => price.priceCategory.id);
            const newPriceIds = prices.map((price) => price.categoryId);
            const pricesToDelete = currentPrices.filter((price) => !newPriceIds.includes(price.priceCategory.id));
            if (pricesToDelete.length > 0) {
                const deletePriceIds = pricesToDelete.map((price) => price.id);
                await this.bikePriceRepository.delete(deletePriceIds);
            }
            for (const price of prices) {
                const existingPrice = currentPrices.find((currentPrice) => currentPrice.priceCategory.id === price.categoryId);
                if (existingPrice) {
                    await this.bikePriceRepository.update(existingPrice.id, {
                        price: price.price,
                    });
                }
                else {
                    await this.bikePriceRepository.save(this.bikePriceRepository.create({
                        bike: { id },
                        priceCategory: { id: price.categoryId },
                        price: price.price,
                    }));
                }
            }
        }
        return this.bikeRepository.findOne({
            where: { id },
            relations: ['prices', 'prices.priceCategory'],
        });
    }
    async deleteBike(id) {
        await this.bikeRepository.delete(id);
    }
};
BikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bike_entity_1.Bike)),
    __param(1, (0, typeorm_1.InjectRepository)(bike_price_entity_1.BikePrice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BikeService);
exports.BikeService = BikeService;
//# sourceMappingURL=bike.service.js.map