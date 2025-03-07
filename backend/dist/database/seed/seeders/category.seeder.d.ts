import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
export declare class CategorySeeder implements SeederInterface {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    seed(): Promise<void>;
    generateData(): Partial<Category>[];
}
