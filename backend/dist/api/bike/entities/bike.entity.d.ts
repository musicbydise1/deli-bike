import { BikePrice } from './bike_price.entity';
export declare class Bike {
    id: number;
    name: string;
    model: string;
    description?: string;
    availability_status: 'available' | 'unavailable' | 'rented' | 'maintenance';
    maxSpeed?: number;
    rangePerCharge?: number;
    chargeTime?: string;
    maxLoad?: number;
    weight?: number;
    power?: string;
    suspension?: string;
    imageUrls: string[];
    tags: string[];
    prices: BikePrice[];
    createdAt: Date;
    updatedAt: Date;
}
