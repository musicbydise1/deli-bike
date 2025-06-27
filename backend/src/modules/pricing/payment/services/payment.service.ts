import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { User } from '../../../users/entities/user.entity';
import { Rental } from '../../../rentals/entities/rental.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Rental)
        private rentalRepository: Repository<Rental>,
    ) {}

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { userId, rentalId, amount, paymentMethod, status } = createPaymentDto;

        // Проверка существования пользователя
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Проверка существования аренды
        const rental = await this.rentalRepository.findOne({ where: { id: rentalId } });
        if (!rental) {
            throw new NotFoundException(`Rental with ID ${rentalId} not found`);
        }

        // Создание объекта Payment
        const payment = this.paymentRepository.create({
            user,
            rental,
            amount,
            paymentMethod,
            status,
        });

        return this.paymentRepository.save(payment);
    }

    async getPaymentsByUser(userId: number): Promise<Payment[]> {
        return this.paymentRepository.find({
            where: { user: { id: userId } },
            relations: ['rental'],
        });
    }

    async getPaymentsByRental(rentalId: number): Promise<Payment[]> {
        return this.paymentRepository.find({
            where: { rental: { id: rentalId } },
            relations: ['user'],
        });
    }

    async updatePaymentStatus(
        id: number,
        status: 'pending' | 'completed' | 'failed',
    ): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        payment.status = status;
        return this.paymentRepository.save(payment);
    }
}