import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entities/payment.entity';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    getPaymentsByUser(userId: number): Promise<Payment[]>;
    getPaymentsByRental(rentalId: number): Promise<Payment[]>;
    updatePaymentStatus(id: number, status: 'pending' | 'completed' | 'failed'): Promise<Payment>;
}
