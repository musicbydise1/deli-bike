import { Repository, EntityManager } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/database/entities/user.entity';
import { Role } from 'src/database/entities/role.entity';
export declare class AdminSeeder implements SeederInterface {
    private readonly rolesRepository;
    private readonly config;
    private readonly entityManager;
    constructor(rolesRepository: Repository<Role>, config: ConfigService, entityManager: EntityManager);
    seed(): Promise<void>;
    generateData(): Promise<Partial<User>>;
}
