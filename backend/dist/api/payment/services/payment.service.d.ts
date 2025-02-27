import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { User } from '../../../database/entities/user.entity';
import { Rental } from '../../rental/entities/rental.entity';
export declare class PaymentService {
    private paymentRepository;
    private userRepository;
    private rentalRepository;
    constructor(paymentRepository: Repository<Payment>, userRepository: Repository<User>, rentalRepository: Repository<Rental>);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    getPaymentsByUser(userId: number): Promise<Payment[]>;
    getPaymentsByRental(rentalId: number): Promise<Payment[]>;
    updatePaymentStatus(id: number, status: 'pending' | 'completed' | 'failed'): Promise<Payment>;
}
