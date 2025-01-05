import { RegisterDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: any): Promise<{
        accessToken: string;
    }>;
    register(user: RegisterDto): Promise<{
        message: string;
    }>;
}
