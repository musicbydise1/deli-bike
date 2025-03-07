import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
import { Role } from '../../entities/role.entity';
export declare class RolesSeeder implements SeederInterface {
    private readonly rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    seed(): Promise<void>;
    generateData(): Partial<Role>[];
}
