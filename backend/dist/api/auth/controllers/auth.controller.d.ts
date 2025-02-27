import { RegisterDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendCode(phoneNumber: string): Promise<{
        message: string;
    }>;
    login(user: {
        phoneNumber: string;
        code: string;
    }): Promise<{
        accessToken: string;
    } | {
        registrationRequired: boolean;
        message: string;
    }>;
    register(user: RegisterDto): Promise<{
        accessToken: string;
    }>;
    otherLogin(user: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
}
