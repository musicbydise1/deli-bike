"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const role_enum_1 = require("../../role/enum/role.enum");
const role_service_1 = require("../../role/services/role.service");
const user_service_1 = require("../../user/services/user.service");
const custom_1 = require("../../../errors/custom");
let AuthService = class AuthService {
    constructor(userService, roleService, jwtService, configService) {
        this.userService = userService;
        this.roleService = roleService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(user) {
        const { email, password } = user;
        const alreadyExistingUser = await this.userService.findByEmail(email);
        if (!alreadyExistingUser)
            throw new common_1.UnauthorizedException(custom_1.errorMessages.auth.wronCredentials);
        const isValidPassword = await this.userService.comparePassword(password, alreadyExistingUser.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException(custom_1.errorMessages.auth.wronCredentials);
        return this.generateToken({
            id: alreadyExistingUser.id,
            email,
        });
    }
    async register(user) {
        const alreadyExistingUser = await this.userService.findByEmail(user.email);
        if (alreadyExistingUser)
            throw new common_1.ConflictException(custom_1.errorMessages.auth.userAlreadyExist);
        const role = user.role === 'corporate'
            ? await this.roleService.findById(role_enum_1.RoleIds.Corporate)
            : await this.roleService.findById(role_enum_1.RoleIds.Courier);
        const newUser = Object.assign(Object.assign({}, user), { isVerified: user.role !== 'corporate' });
        await this.userService.createUser(newUser, role);
        return {
            message: 'success',
        };
    }
    async generateToken(payload) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('jwt.secret'),
        });
        return { accessToken };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        role_service_1.RoleService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map