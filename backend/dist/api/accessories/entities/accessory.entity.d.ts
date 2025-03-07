import { Bike } from '../../bike/entities/bike.entity';
export declare class Accessory {
    id: number;
    bikeId: number;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    bike: Bike;
}
