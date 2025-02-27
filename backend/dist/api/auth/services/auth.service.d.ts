import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto, RegisterDto } from '../dto/auth.dto';
import { UserService } from 'src/api/user/services/user.service';
import { RoleService } from 'src/api/role/services/role.service';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private configService;
    private readonly roleService;
    private codes;
    private telegramBot;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService, roleService: RoleService);
    sendCode(phoneNumber: string): Promise<{
        message: string;
    }>;
    login(loginData: {
        phoneNumber: string;
        code: string;
    }): Promise<{
        accessToken: string;
    } | {
        registrationRequired: boolean;
        message: string;
    }>;
    otherLogin(loginData: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
    }>;
    generateToken(payload: PayloadDto): Promise<{
        accessToken: string;
    }>;
    private generateCode;
    private verifyCode;
}
