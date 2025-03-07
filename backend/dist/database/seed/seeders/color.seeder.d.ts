import { Color } from '../../entities/color.entity';
import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
export declare class ColorSeeder implements SeederInterface {
    private readonly colorsRepository;
    constructor(colorsRepository: Repository<Color>);
    seed(): Promise<void>;
    generateData(): Partial<Color>[];
}
