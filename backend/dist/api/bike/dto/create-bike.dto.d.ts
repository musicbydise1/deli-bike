declare class BikePriceDto {
    categoryId: number;
    price: number;
}
export declare class CreateBikeDto {
    name: string;
    model: string;
    description?: string;
    imageUrls?: string[];
    maxSpeed?: number;
    rangePerCharge?: number;
    chargeTime?: string;
    maxLoad?: number;
    weight?: number;
    power?: string;
    suspension?: string;
    tags?: string[];
    prices: BikePriceDto[];
}
export {};
