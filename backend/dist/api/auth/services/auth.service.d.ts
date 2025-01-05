import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/api/role/services/role.service';
import { CreateUserDto } from 'src/api/user/dto/user.dto';
import { UserService } from 'src/api/user/services/user.service';
import { PayloadDto, RegisterDto } from '../dto/auth.dto';
export declare class AuthService {
    private readonly userService;
    private readonly roleService;
    private jwtService;
    private configService;
    constructor(userService: UserService, roleService: RoleService, jwtService: JwtService, configService: ConfigService);
    login(user: CreateUserDto): Promise<{
        accessToken: string;
    }>;
    register(user: RegisterDto): Promise<{
        message: string;
    }>;
    generateToken(payload: PayloadDto): Promise<{
        accessToken: string;
    }>;
}
