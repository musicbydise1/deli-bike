import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
export declare class Rental {
    id: number;
    user: User;
    bike: Bike;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: 'active' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}
