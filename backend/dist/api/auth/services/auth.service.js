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
const user_service_1 = require("../../user/services/user.service");
const custom_1 = require("../../../errors/custom");
const role_service_1 = require("../../role/services/role.service");
const TelegramBot = require("node-telegram-bot-api");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService, roleService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.roleService = roleService;
        this.codes = new Map();
        const telegramToken = '7722439245:AAH5crruoiLpYfiCnQRNUe83gQ55ozx3Og8';
        this.telegramBot = new TelegramBot(telegramToken, { polling: true });
        this.telegramBot.on('message', async (msg) => {
            if (msg.text && msg.text.startsWith('/start')) {
                const chatId = msg.chat.id.toString();
                const parts = msg.text.split(' ');
                if (parts.length < 2) {
                    await this.telegramBot.sendMessage(chatId, 'Пожалуйста, передайте ваш номер телефона, например: /start +79161234567');
                    return;
                }
                const phoneNumber = parts[1].trim();
                try {
                    await this.userService.updateUserTelegramChatId(phoneNumber, chatId);
                    await this.telegramBot.sendMessage(chatId, 'Ваш Telegram чат успешно привязан к аккаунту.');
                }
                catch (error) {
                    await this.telegramBot.sendMessage(chatId, 'Ошибка при привязке Telegram чата. Проверьте правильность номера.');
                }
            }
        });
    }
    async sendCode(phoneNumber) {
        const user = await this.userService.findByPhone(phoneNumber);
        if (!user || !user.iin) {
            throw new common_1.NotFoundException('Пользователь не найден или не привязан Telegram-чат');
        }
        const code = this.generateCode();
        const expires = Date.now() + 15 * 60 * 1000;
        this.codes.set(phoneNumber, { code, expires });
        await this.telegramBot.sendMessage(user.iin, `Ваш код подтверждения: ${code}`);
        console.log(`Отправляем код ${code} для номера ${phoneNumber} на Telegram chat ${user.iin}`);
        return { message: 'Код подтверждения отправлен' };
    }
    async login(loginData) {
        const { phoneNumber, code } = loginData;
        const valid = await this.verifyCode(phoneNumber, code);
        if (!valid) {
            throw new common_1.UnauthorizedException(custom_1.errorMessages.auth.wronCredentials);
        }
        const user = await this.userService.findByPhone(phoneNumber);
        if (!user) {
            return { registrationRequired: true, message: 'Пользователь не найден, необходимо пройти регистрацию' };
        }
        return this.generateToken({ id: user.id, phone: user.phoneNumber });
    }
    async otherLogin(loginData) {
        const { email, password } = loginData;
        const user = await this.userService.findByEmail(email, ['roles']);
        if (!user) {
            throw new common_1.UnauthorizedException("Пользователь с таким email не найден");
        }
        const isPasswordValid = await this.userService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Неверный пароль");
        }
        return this.generateToken({ id: user.id, phone: user.phoneNumber });
    }
    async register(registerDto) {
        const { phoneNumber } = registerDto;
        const existingUser = await this.userService.findByPhone(phoneNumber);
        if (existingUser) {
            throw new common_1.ConflictException(custom_1.errorMessages.auth.userAlreadyExist);
        }
        const newUser = await this.userService.createUser({
            phoneNumber,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            patronymic: registerDto.patronymic,
            email: registerDto.email,
            photoIdFront: registerDto.idCardFrontImage,
            photoIdBack: registerDto.idCardBackImage,
        });
        const courierRole = await this.roleService.findById(1);
        if (!courierRole) {
            throw new common_1.NotFoundException('Роль "courier" не найдена');
        }
        await this.roleService.assignRoleToUser({
            roleId: courierRole.id,
            userId: newUser.id,
        });
        return this.generateToken({ id: newUser.id, phone: newUser.phoneNumber });
    }
    async generateToken(payload) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('jwt.secret'),
        });
        return { accessToken };
    }
    generateCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    async verifyCode(phone, code) {
        const record = this.codes.get(phone);
        if (!record)
            return false;
        if (record.code !== code)
            return false;
        if (Date.now() > record.expires) {
            this.codes.delete(phone);
            return false;
        }
        this.codes.delete(phone);
        return true;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        role_service_1.RoleService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map