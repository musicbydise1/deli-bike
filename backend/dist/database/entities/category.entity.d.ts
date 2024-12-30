import { Product } from './product.entity';
export declare class Category {
    id: number;
    name: string;
    products: Product;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum CategoryIds {
    Computers = 1,
    Fashion = 2
}
export declare enum Categories {
    Computers = "Computers",
    Fashion = "Fashion"
}
