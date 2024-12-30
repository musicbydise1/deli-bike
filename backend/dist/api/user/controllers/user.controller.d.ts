import { User } from 'src/database/entities/user.entity';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profile(user: User): Promise<User>;
}
