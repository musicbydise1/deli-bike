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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../entities/payment.entity");
const user_entity_1 = require("../../../database/entities/user.entity");
const rental_entity_1 = require("../../rental/entities/rental.entity");
let PaymentService = class PaymentService {
    constructor(paymentRepository, userRepository, rentalRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.rentalRepository = rentalRepository;
    }
    async createPayment(createPaymentDto) {
        const { userId, rentalId, amount, paymentMethod, status } = createPaymentDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const rental = await this.rentalRepository.findOne({ where: { id: rentalId } });
        if (!rental) {
            throw new common_1.NotFoundException(`Rental with ID ${rentalId} not found`);
        }
        const payment = this.paymentRepository.create({
            user,
            rental,
            amount,
            paymentMethod,
            status,
        });
        return this.paymentRepository.save(payment);
    }
    async getPaymentsByUser(userId) {
        return this.paymentRepository.find({
            where: { user: { id: userId } },
            relations: ['rental'],
        });
    }
    async getPaymentsByRental(rentalId) {
        return this.paymentRepository.find({
            where: { rental: { id: rentalId } },
            relations: ['user'],
        });
    }
    async updatePaymentStatus(id, status) {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        payment.status = status;
        return this.paymentRepository.save(payment);
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map