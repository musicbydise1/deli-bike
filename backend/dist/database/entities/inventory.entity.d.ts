import { Country } from './country.entity';
import { ProductVariation } from './productVariation.entity';
export declare class Inventory {
    id: number;
    productVariation: ProductVariation;
    productVariationId: number;
    country: Country;
    countryCode: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
