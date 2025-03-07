import { BikePrice } from './bike_price.entity';
import { Accessory } from '../../accessories/entities/accessory.entity';
import { Tariff } from '../../tariffs/entities/tariff.entity';
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
    stock?: number;
    tags: string[];
    prices: BikePrice[];
    accessories: Accessory[];
    tariffs: Tariff[];
    createdAt: Date;
    updatedAt: Date;
}
