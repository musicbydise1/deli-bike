import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { Role } from '../../../database/entities/role.entity';
export declare class UserService {
    private readonly repository;
    constructor(repository: Repository<User>);
    createUser(body: CreateUserDto, ...roles: Role[]): Promise<User>;
    findByEmail(email: string, relations?: string[]): Promise<User>;
    findByPhone(phoneNumber: string, relations?: string[]): Promise<User>;
    comparePassword(password: string, userPassword: string): Promise<boolean>;
    findById(id: number, options?: {
        relations?: string[];
    }): Promise<User>;
    save(user: User): Promise<User>;
    updateUserTelegramChatId(phoneNumber: string, chatId: string): Promise<void>;
}
