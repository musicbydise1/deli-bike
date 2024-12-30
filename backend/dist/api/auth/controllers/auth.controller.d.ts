import { CreateUserDto } from 'src/api/user/dto/user.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: CreateUserDto): Promise<{
        accessToken: string;
    }>;
    register(user: CreateUserDto): Promise<{
        message: string;
    }>;
}
