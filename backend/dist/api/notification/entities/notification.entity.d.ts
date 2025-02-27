import { User } from '../../../database/entities/user.entity';
export declare class Notification {
    id: number;
    user: User;
    type: string;
    status: string;
    message: string;
    createdAt: Date;
}
