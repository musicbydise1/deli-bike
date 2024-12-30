import { ProductDetails } from './productDetails';
export declare class CreateProductDto {
    categoryId: number;
}
export declare class ProductDetailsDto {
    title: string;
    code: string;
    variationType: string;
    details: ProductDetails;
    about: string[];
    description: string;
}
