import { Bike } from './bike.entity';
import { PriceCategory } from './price_category.entity';
export declare class BikePrice {
    id: number;
    bike: Bike;
    priceCategory: PriceCategory;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
