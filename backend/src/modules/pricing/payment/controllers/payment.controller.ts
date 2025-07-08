import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entities/payment.entity';
import { Auth } from '../../../../shared/guards/auth.decorator';
import { RoleIds } from '../../../../shared/constants/roles.enum';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Auth()
  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Auth()
  @Get('/user/:userId')
  async getPaymentsByUser(@Param('userId') userId: number): Promise<Payment[]> {
    return this.paymentService.getPaymentsByUser(userId);
  }

  @Auth(RoleIds.Admin)
  @Get('/rental/:rentalId')
  async getPaymentsByRental(@Param('rentalId') rentalId: number): Promise<Payment[]> {
    return this.paymentService.getPaymentsByRental(rentalId);
  }

  @Auth(RoleIds.Admin)
  @Patch('/:id/status')
  async updatePaymentStatus(
    @Param('id') id: number,
    @Body('status') status: 'pending' | 'completed' | 'failed',
  ): Promise<Payment> {
    return this.paymentService.updatePaymentStatus(id, status);
  }
}
