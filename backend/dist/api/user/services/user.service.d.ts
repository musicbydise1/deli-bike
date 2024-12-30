import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { Role } from 'src/database/entities/role.entity';
import { UserRelation } from '../dto/user.types';
export declare class UserService {
    private readonly repository;
    constructor(repository: Repository<User>);
    createUser(body: CreateUserDto, ...roles: Role[]): Promise<User>;
    findByEmail(email: string, relations?: UserRelation): Promise<User>;
    comparePassword(password: any, userPassword: any): Promise<boolean>;
    findById(id: number, relations?: UserRelation): Promise<User>;
    save(user: User): Promise<User>;
}
