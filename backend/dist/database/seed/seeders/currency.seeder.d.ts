import { Currency } from 'src/database/entities/currency.entity';
import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
export declare class CurrencySeeder implements SeederInterface {
    private readonly currencyRepository;
    constructor(currencyRepository: Repository<Currency>);
    seed(): Promise<void>;
    generateData(): Partial<Currency>[];
}
