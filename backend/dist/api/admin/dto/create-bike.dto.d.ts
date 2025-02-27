export declare class CreateBikeDto {
    name: string;
    model: string;
    description: string;
    pricePerHour: number;
    pricePerDay: number;
    imageUrls: string[];
    availabilityStatus: 'available' | 'unavailable';
}
