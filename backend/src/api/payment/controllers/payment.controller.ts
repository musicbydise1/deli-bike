import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entities/payment.entity';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
        return this.paymentService.createPayment(createPaymentDto);
    }

    @Get('/user/:userId')
    async getPaymentsByUser(@Param('userId') userId: number): Promise<Payment[]> {
        return this.paymentService.getPaymentsByUser(userId);
    }

    @Get('/rental/:rentalId')
    async getPaymentsByRental(@Param('rentalId') rentalId: number): Promise<Payment[]> {
        return this.paymentService.getPaymentsByRental(rentalId);
    }

    @Patch('/:id/status')
    async updatePaymentStatus(
        @Param('id') id: number,
        @Body('status') status: 'pending' | 'completed' | 'failed',
    ): Promise<Payment> {
        return this.paymentService.updatePaymentStatus(id, status);
    }
}