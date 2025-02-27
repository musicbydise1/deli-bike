import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
export declare class Review {
    id: number;
    user: User;
    bike: Bike;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}
