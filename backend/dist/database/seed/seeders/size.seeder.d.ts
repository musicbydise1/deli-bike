import { Size } from 'src/database/entities/size.entity';
import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
export declare class SizeSeeder implements SeederInterface {
    private readonly SizeRepository;
    constructor(SizeRepository: Repository<Size>);
    seed(): Promise<void>;
    generateData(): Partial<Size>[];
}
