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
exports.RentalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rental_entity_1 = require("../entities/rental.entity");
const bike_entity_1 = require("../../bike/entities/bike.entity");
let RentalService = class RentalService {
    constructor(rentalRepository, bikeRepository) {
        this.rentalRepository = rentalRepository;
        this.bikeRepository = bikeRepository;
    }
    async createRental(createRentalDto) {
        const { userId, bikeId, startDate, endDate, totalPrice } = createRentalDto;
        const bike = await this.bikeRepository.findOne({ where: { id: bikeId } });
        if (!bike || bike.availability_status === 'unavailable') {
            throw new common_1.NotFoundException('Bike is not available');
        }
        bike.availability_status = 'unavailable';
        await this.bikeRepository.save(bike);
        const rental = this.rentalRepository.create({
            user: { id: userId },
            bike: { id: bikeId },
            startDate,
            endDate,
            totalPrice,
        });
        return this.rentalRepository.save(rental);
    }
    async completeRental(id) {
        console.log('Looking for rental with ID:', id);
        const rental = await this.rentalRepository.findOne({
            where: { id },
            relations: ['bike'],
        });
        console.log('Rental retrieved:', rental);
        if (!rental) {
            throw new common_1.NotFoundException(`Rental with ID ${id} not found`);
        }
        if (!rental.bike) {
            throw new common_1.NotFoundException(`Bike associated with rental ID ${id} not found`);
        }
        rental.status = 'completed';
        await this.rentalRepository.save(rental);
        rental.bike.availability_status = 'available';
        await this.bikeRepository.save(rental.bike);
        return rental;
    }
    async getAllRentals() {
        return this.rentalRepository.find({ relations: ['bike', 'user'] });
    }
    async getActiveRentals() {
        return this.rentalRepository.find({
            where: { status: 'active' },
            relations: ['bike', 'user'],
        });
    }
    async getRentalsByUser(userId) {
        return this.rentalRepository.find({
            where: { user: { id: userId } },
            relations: ['bike'],
        });
    }
    async getUserRentalHistory(userId) {
        return this.rentalRepository.find({
            where: { user: { id: userId }, status: (0, typeorm_2.In)(['completed', 'cancelled']) },
            relations: ['bike'],
        });
    }
    async cancelRental(id) {
        const rental = await this.rentalRepository.findOne({
            where: { id },
            relations: ['bike'],
        });
        if (!rental) {
            throw new common_1.NotFoundException(`Rental with ID ${id} not found`);
        }
        if (rental.status !== 'active') {
            throw new common_1.BadRequestException('Only active rentals can be cancelled');
        }
        rental.status = 'cancelled';
        await this.rentalRepository.save(rental);
        rental.bike.availability_status = 'available';
        await this.bikeRepository.save(rental.bike);
        return rental;
    }
    async getRentalById(id) {
        const rental = await this.rentalRepository.findOne({
            where: { id },
            relations: ['bike', 'user'],
        });
        if (!rental) {
            throw new common_1.NotFoundException(`Rental with ID ${id} not found`);
        }
        return rental;
    }
    async isBikeAvailable(bikeId) {
        const bike = await this.bikeRepository.findOne({ where: { id: bikeId } });
        return (bike === null || bike === void 0 ? void 0 : bike.availability_status) === 'available';
    }
};
RentalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __param(1, (0, typeorm_1.InjectRepository)(bike_entity_1.Bike)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RentalService);
exports.RentalService = RentalService;
//# sourceMappingURL=rental.service.js.map