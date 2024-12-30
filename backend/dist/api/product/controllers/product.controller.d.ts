import { CreateProductDto, ProductDetailsDto } from '../dto/product.dto';
import { ProductService } from '../services/product.service';
import { FindOneParams } from 'src/common/helper/findOneParams.dto';
import { User } from 'src/database/entities/user.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProduct(product: FindOneParams): Promise<import("../../../database/entities/product.entity").Product>;
    createProduct(body: CreateProductDto, user: User): Promise<import("../../../database/entities/product.entity").Product>;
    addProductDetails(product: FindOneParams, body: ProductDetailsDto, user: User): Promise<any>;
    activateProduct(product: FindOneParams, user: User): Promise<any>;
    deleteProduct(product: FindOneParams, user: User): Promise<{
        message: string;
    }>;
}
