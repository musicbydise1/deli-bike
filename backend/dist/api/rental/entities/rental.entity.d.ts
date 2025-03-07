import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
export type RentalStatus = 'on_payment' | 'active' | 'completed' | 'cancelled';
export declare class Rental {
    id: number;
    user: User;
    bike: Bike;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
}
