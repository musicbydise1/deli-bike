import { PriceCategoryService } from '../services/price-category.service';
import { CreatePriceCategoryDto } from '../dto/create-price-category.dto';
import { UpdatePriceCategoryDto } from '../dto/update-price-category.dto';
export declare class PriceCategoryController {
    private readonly priceCategoryService;
    constructor(priceCategoryService: PriceCategoryService);
    create(createDto: CreatePriceCategoryDto): Promise<import("../entities/price-category.entity").PriceCategory>;
    findAll(): Promise<import("../entities/price-category.entity").PriceCategory[]>;
    findOne(id: string): Promise<import("../entities/price-category.entity").PriceCategory>;
    update(id: string, updateDto: UpdatePriceCategoryDto): Promise<import("../entities/price-category.entity").PriceCategory>;
    remove(id: string): Promise<void>;
}
