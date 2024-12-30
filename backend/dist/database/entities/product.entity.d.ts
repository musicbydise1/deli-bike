import { ProductDetails } from 'src/api/product/dto/productDetails';
import { Category } from './category.entity';
import { User } from './user.entity';
export declare class Product {
    id: number;
    code: string;
    title: string;
    variationType: string;
    description?: string | null;
    about?: string[];
    details: Partial<ProductDetails> | null;
    isActive: boolean;
    merchantId: number;
    merchant: User;
    category: Category;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum VariationTypes {
    NONE = "NONE",
    OnlySize = "OnlySize",
    OnlyColor = "OnlyColor",
    SizeAndColor = "SizeAndColor"
}
export declare const variationTypesKeys: string[];
