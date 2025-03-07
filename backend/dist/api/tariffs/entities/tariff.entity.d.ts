import { Bike } from '../../bike/entities/bike.entity';
export declare class Tariff {
    id: number;
    bikeId: number;
    name: string;
    price: number;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    bike: Bike;
}
