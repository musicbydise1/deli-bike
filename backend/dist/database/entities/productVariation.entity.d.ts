import { Color } from './color.entity';
import { Size } from './size.entity';
export declare class ProductVariation {
    id: number;
    productId: number;
    size: Size;
    sizeCode: string;
    color: Color;
    colorName: string;
    imageUrls: string[];
    createdAt: Date;
    updatedAt: Date;
}
