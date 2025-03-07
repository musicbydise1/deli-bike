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
        this.conversationState = new Map();
        const telegramToken = '7722439245:AAH5crruoiLpYfiCnQRNUe83gQ55ozx3Og8';
        this.telegramBot = new TelegramBot(telegramToken, { polling: true });
        this.telegramBot.on('message', async (msg) => {
            const chatId = msg.chat.id.toString();
            const text = msg.text ? msg.text.trim() : '';
            if (text === '/start') {
                this.conversationState.delete(chatId);
                await this.telegramBot.sendMessage(chatId, 'Добро пожаловать! Введите, пожалуйста, ваш номер телефона:');
                this.conversationState.set(chatId, { step: 'awaitingPhone' });
                return;
            }
            const state = this.conversationState.get(chatId);
            if (state && state.step === 'awaitingPhone') {
                const phoneNumber = text;
                try {
                    const user = await this.userService.findByPhone(phoneNumber);
                    if (user) {
                        await this.telegramBot.sendMessage(chatId, 'Вы уже зарегистрированы.');
                        this.conversationState.delete(chatId);
                    }
                    else {
                        await this.telegramBot.sendMessage(chatId, 'Пользователь не найден. Для регистрации введите команду /register.');
                        this.conversationState.set(chatId, { step: 'awaitingRegistration', phoneNumber });
                    }
                }
                catch (error) {
                    await this.telegramBot.sendMessage(chatId, 'Ошибка при проверке номера. Попробуйте ещё раз.');
                }
                return;
            }
            if (text === '/register') {
                const regState = this.conversationState.get(chatId);
                if (!regState || regState.step !== 'awaitingRegistration') {
                    await this.telegramBot.sendMessage(chatId, 'Сначала введите номер телефона через /start.');
                    return;
                }
                await this.telegramBot.sendMessage(chatId, 'Введите ваше имя:');
                regState.step = 'awaitingFirstName';
                this.conversationState.set(chatId, regState);
                return;
            }
            if (state) {
                if (state.step === 'awaitingFirstName') {
                    state.firstName = text;
                    state.step = 'awaitingLastName';
                    this.conversationState.set(chatId, state);
                    await this.telegramBot.sendMessage(chatId, 'Введите вашу фамилию:');
                    return;
                }
                if (state.step === 'awaitingLastName') {
                    state.lastName = text;
                    state.step = 'awaitingEmail';
                    this.conversationState.set(chatId, state);
                    await this.telegramBot.sendMessage(chatId, 'Введите ваш email:');
                    return;
                }
                if (state.step === 'awaitingEmail') {
                    state.email = text;
                    state.step = 'awaitingPhotoIdFront';
                    this.conversationState.set(chatId, state);
                    await this.telegramBot.sendMessage(chatId, 'Отправьте фотографию удостоверения (передняя сторона):');
                    return;
                }
            }
            if (state && state.step === 'awaitingPhotoIdFront' && msg.photo) {
                const photo = msg.photo[msg.photo.length - 1];
                state.photoIdFront = photo.file_id;
                state.step = 'awaitingPhotoIdBack';
                this.conversationState.set(chatId, state);
                await this.telegramBot.sendMessage(chatId, 'Отправьте фотографию удостоверения (задняя сторона):');
                return;
            }
            if (state && state.step === 'awaitingPhotoIdBack' && msg.photo) {
                const photo = msg.photo[msg.photo.length - 1];
                state.photoIdBack = photo.file_id;
                const registerDto = {
                    phoneNumber: state.phoneNumber,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    patronymic: '',
                    email: state.email,
                    idCardFrontImage: state.photoIdFront,
                    idCardBackImage: state.photoIdBack,
                    code: '',
                    role: 'courier',
                    iin: chatId
                };
                try {
                    const tokenData = await this.register(registerDto);
                    await this.telegramBot.sendMessage(chatId, 'Регистрация прошла успешно!');
                }
                catch (error) {
                    await this.telegramBot.sendMessage(chatId, `Ошибка регистрации: ${error.message}`);
                }
                this.conversationState.delete(chatId);
                return;
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
            iin: registerDto.iin,
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