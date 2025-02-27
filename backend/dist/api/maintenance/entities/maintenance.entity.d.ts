import { Bike } from '../../bike/entities/bike.entity';
export declare class Maintenance {
    id: number;
    bike: Bike;
    serviceDate: Date;
    description?: string;
    status: 'scheduled' | 'in_progress' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}
