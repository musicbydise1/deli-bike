import { User } from '../../../database/entities/user.entity';
import { Rental } from '../../rental/entities/rental.entity';
export declare class Payment {
    id: number;
    user: User;
    rental: Rental;
    amount: number;
    paymentMethod: string;
    status: 'pending' | 'completed' | 'failed';
    transactionDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
