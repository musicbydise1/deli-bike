import { Country } from './country.entity';
import { Currency } from './currency.entity';
import { ProductVariation } from './productVariation.entity';
export declare class ProductVariationPrice {
    id: number;
    productVariation: ProductVariation;
    productVariationId: number;
    country: Country;
    countryCode: string;
    currency: Currency;
    currencyCode: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
