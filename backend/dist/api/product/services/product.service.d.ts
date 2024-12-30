import { EntityManager } from 'typeorm';
import { CreateProductDto, ProductDetailsDto } from '../dto/product.dto';
import { Product } from 'src/database/entities/product.entity';
export declare class ProductService {
    private readonly entityManager;
    constructor(entityManager: EntityManager);
    getProduct(productId: number): Promise<Product>;
    createProduct(data: CreateProductDto, merchantId: number): Promise<Product>;
    addProductDetails(productId: number, body: ProductDetailsDto, merchantId: number): Promise<any>;
    activateProduct(productId: number, merchantId: number): Promise<any>;
    validate(productId: number): Promise<boolean>;
    deleteProduct(productId: number, merchantId: number): Promise<{
        message: string;
    }>;
}
