import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto, RegisterDto } from '../dto/auth.dto';
import { UserService } from '../../user/services/user.service';
import { errorMessages } from '../../../errors/custom';
import { RoleService } from '../../role/services/role.service';
import * as TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import * as fs from 'fs';
import { extname } from 'path';

interface ConversationState {
  step: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photoIdFront?: string;
  photoIdBack?: string;
}

@Injectable()
export class AuthService {
  // In-memory хранилище для SMS-кодов: { phone: { code, expires } }
  private codes: Map<string, { code: string; expires: number }> = new Map();

  private telegramBot: TelegramBot;
  private conversationState: Map<string, ConversationState> = new Map();

  constructor(
      private readonly userService: UserService,
      private jwtService: JwtService,
      private configService: ConfigService,
      private readonly roleService: RoleService,
  ) {
    const telegramToken = '7722439245:AAH5crruoiLpYfiCnQRNUe83gQ55ozx3Og8';
    // Включаем polling (или можно использовать webhook)
    this.telegramBot = new TelegramBot(telegramToken, { polling: true });

    // Обработчик кликов по inline-кнопкам
    this.telegramBot.on('callback_query', async (query) => {
      const chatId = query.message.chat.id.toString();
      await this.telegramBot.answerCallbackQuery(query.id);

      if (query.data === 'START_REGISTER') {
        const state = this.conversationState.get(chatId);
        if (!state || state.step !== 'awaitingRegistration') {
          return this.telegramBot.sendMessage(
              chatId,
              'Сначала введите номер телефона командой /start.',
          );
        }
        state.step = 'awaitingFirstName';
        this.conversationState.set(chatId, state);
        await this.telegramBot.sendMessage(chatId, 'Введите ваше имя:');
      }
    });

    // Прослушиваем входящие текстовые сообщения
    this.telegramBot.on('message', async (msg) => {
      const chatId = msg.chat.id.toString();
      const text = msg.text?.trim() ?? '';
      const state = this.conversationState.get(chatId);

      // 1) Команда /start
      if (text === '/start') {
        this.conversationState.set(chatId, { step: 'awaitingPhone' });
        return this.telegramBot.sendMessage(
            chatId,
            'Добро пожаловать! Введите ваш номер (пример для KZ: 77012345678):',
        );
      }

      // 2) Ждём номер телефона
      if (state?.step === 'awaitingPhone') {
        const phoneNumber = text;
        if (!/^\d+$/.test(phoneNumber)) {
          return this.telegramBot.sendMessage(
              chatId,
              'Неверный формат. Введите только цифры, без пробелов и символов.',
          );
        }

        try {
          const user = await this.userService.findByPhone(phoneNumber);
          if (user) {
            await this.telegramBot.sendMessage(chatId, 'Вы уже зарегистрированы.');
            this.conversationState.delete(chatId);
          } else {
            // Inline-кнопка для регистрации
            await this.telegramBot.sendMessage(
                chatId,
                'Пользователь не найден. Чтобы зарегистрироваться — нажмите кнопку ниже:',
                {
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: 'Зарегистрироваться', callback_data: 'START_REGISTER' }],
                    ],
                  },
                },
            );
            this.conversationState.set(chatId, {
              step: 'awaitingRegistration',
              phoneNumber,
            });
          }
        } catch (error) {
          await this.telegramBot.sendMessage(
              chatId,
              'Ошибка при проверке номера. Попробуйте ещё раз.',
          );
        }
        return;
      }

      // 3) Команда /register (если пользователь введёт вручную)
      if (text === '/register') {
        const regState = this.conversationState.get(chatId);
        if (!regState || regState.step !== 'awaitingRegistration') {
          return this.telegramBot.sendMessage(
              chatId,
              'Сначала введите номер через /start.',
          );
        }
        regState.step = 'awaitingFirstName';
        this.conversationState.set(chatId, regState);
        return this.telegramBot.sendMessage(chatId, 'Введите ваше имя:');
      }

      // 4) Получаем firstName
      if (state?.step === 'awaitingFirstName') {
        state.firstName = text;
        state.step = 'awaitingLastName';
        this.conversationState.set(chatId, state);
        return this.telegramBot.sendMessage(chatId, 'Введите вашу фамилию:');
      }

      // 5) Получаем lastName
      if (state?.step === 'awaitingLastName') {
        state.lastName = text;
        state.step = 'awaitingEmail';
        this.conversationState.set(chatId, state);
        return this.telegramBot.sendMessage(chatId, 'Введите ваш email:');
      }

      // 6) Получаем email
      if (state?.step === 'awaitingEmail') {
        state.email = text;
        state.step = 'awaitingPhotoIdFront';
        this.conversationState.set(chatId, state);
        return this.telegramBot.sendMessage(chatId, 'Отправьте фотографию удостоверения (передняя сторона):');
      }

      // 7) Фото передней стороны удостоверения
      if (state?.step === 'awaitingPhotoIdFront' && msg.photo) {
        const photo = msg.photo[msg.photo.length - 1];
        const fileLink = await this.telegramBot.getFileLink(photo.file_id);
        const fileExt = extname(fileLink) || '.jpg';
        const uniqueName = `user-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
        const localPath = `./uploads/users/${uniqueName}`;
        try {
          const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
          fs.writeFileSync(localPath, response.data);
          state.photoIdFront = `http://localhost:4000/uploads/users/${uniqueName}`;
        } catch (err) {
          console.error('Ошибка скачивания файла:', err.message);
          return this.telegramBot.sendMessage(chatId, 'Произошла ошибка при скачивании файла. Попробуйте ещё раз.');
        }
        state.step = 'awaitingPhotoIdBack';
        this.conversationState.set(chatId, state);
        return this.telegramBot.sendMessage(chatId, 'Отправьте фотографию удостоверения (задняя сторона):');
      }

      // 8) Фото задней стороны удостоверения и регистрация
      if (state?.step === 'awaitingPhotoIdBack' && msg.photo) {
        const photo = msg.photo[msg.photo.length - 1];
        const fileLink = await this.telegramBot.getFileLink(photo.file_id);
        const fileExt = extname(fileLink) || '.jpg';
        const uniqueName = `user-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
        const localPath = `./uploads/users/${uniqueName}`;
        try {
          const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
          fs.writeFileSync(localPath, response.data);
          state.photoIdBack = `http://localhost:4000/uploads/users/${uniqueName}`;
        } catch (err) {
          console.error('Ошибка скачивания файла:', err.message);
          return this.telegramBot.sendMessage(chatId, 'Произошла ошибка при скачивании файла. Попробуйте ещё раз.');
        }

        const registerDto: RegisterDto = {
          phoneNumber: state.phoneNumber,
          firstName: state.firstName,
          lastName: state.lastName,
          patronymic: '',
          email: state.email,
          idCardFrontImage: state.photoIdFront,
          idCardBackImage: state.photoIdBack,
          code: '',
          role: 'courier',
          telegramChatId: chatId,
        };

        try {
          await this.register(registerDto);
          await this.telegramBot.sendMessage(chatId, 'Регистрация прошла успешно!');
        } catch (error) {
          await this.telegramBot.sendMessage(chatId, `Ошибка регистрации: ${error.message}`);
        }

        this.conversationState.delete(chatId);
        return;
      }
    });
  }

  /**
   * Отправка SMS с кодом подтверждения на указанный номер телефона (пример).
   */
  async sendCode(phoneNumber: string) {
    const user = await this.userService.findByPhone(phoneNumber);
    if (!user || !user.telegramChatId) {
      throw new NotFoundException('Пользователь не найден или не привязан Telegram-чат');
    }

    const code = this.generateCode();
    const expires = Date.now() + 15 * 60 * 1000;
    this.codes.set(phoneNumber, { code, expires });

    await this.telegramBot.sendMessage(
        user.telegramChatId,
        `Ваш код подтверждения: ${code}`,
    );
    return { message: 'Код подтверждения отправлен' };
  }

  async login(loginData: { phoneNumber: string; code: string }) {
    const { phoneNumber, code } = loginData;
    const valid = await this.verifyCode(phoneNumber, code);
    if (!valid) {
      throw new UnauthorizedException(errorMessages.auth.wronCredentials);
    }
    const user = await this.userService.findByPhone(phoneNumber);
    if (!user) {
      return { registrationRequired: true, message: 'Пользователь не найден, необходимо пройти регистрацию' };
    }
    return this.generateToken({ id: user.id, phone: user.phoneNumber });
  }

  async otherLogin(loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    const user = await this.userService.findByEmail(email, ['roles']);
    if (!user) {
      throw new UnauthorizedException('Пользователь с таким email не найден');
    }

    const isPasswordValid = await this.userService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return this.generateToken({ id: user.id, phone: user.phoneNumber });
  }

  async register(registerDto: RegisterDto) {
    const { phoneNumber } = registerDto;
    const existingUser = await this.userService.findByPhone(phoneNumber);
    if (existingUser) {
      throw new ConflictException(errorMessages.auth.userAlreadyExist);
    }

    const newUser = await this.userService.createUser({
      phoneNumber,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      patronymic: registerDto.patronymic,
      email: registerDto.email,
      idCardFrontImage: registerDto.idCardFrontImage,
      idCardBackImage: registerDto.idCardBackImage,
      telegramChatId: registerDto.telegramChatId,
    });

    const courierRole = await this.roleService.findById(1);
    if (!courierRole) {
      throw new NotFoundException('Роль "courier" не найдена');
    }
    await this.roleService.assignRoleToUser({ roleId: courierRole.id, userId: newUser.id });

    return this.generateToken({ id: newUser.id, phone: newUser.phoneNumber });
  }

  async generateToken(payload: PayloadDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.secret'),
    });
    return { accessToken };
  }

  private generateCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private async verifyCode(phone: string, code: string): Promise<boolean> {
    const record = this.codes.get(phone);
    if (!record) return false;
    if (record.code !== code) return false;
    if (Date.now() > record.expires) {
      this.codes.delete(phone);
      return false;
    }
    this.codes.delete(phone);
    return true;
  }
}
