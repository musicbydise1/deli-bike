import { Country } from 'src/database/entities/country.entity';
import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
export declare class CountrySeeder implements SeederInterface {
    private readonly countryRepository;
    constructor(countryRepository: Repository<Country>);
    seed(): Promise<void>;
    generateData(): Partial<Country>[];
}
