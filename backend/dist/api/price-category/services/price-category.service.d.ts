import { Repository } from 'typeorm';
import { PriceCategory } from '../entities/price-category.entity';
import { CreatePriceCategoryDto } from '../dto/create-price-category.dto';
import { UpdatePriceCategoryDto } from '../dto/update-price-category.dto';
export declare class PriceCategoryService {
    private readonly priceCategoryRepository;
    constructor(priceCategoryRepository: Repository<PriceCategory>);
    create(createDto: CreatePriceCategoryDto): Promise<PriceCategory>;
    findAll(): Promise<PriceCategory[]>;
    findOne(id: number): Promise<PriceCategory>;
    update(id: number, updateDto: UpdatePriceCategoryDto): Promise<PriceCategory>;
    remove(id: number): Promise<void>;
}
