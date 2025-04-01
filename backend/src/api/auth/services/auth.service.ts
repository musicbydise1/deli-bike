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

    // Прослушиваем входящие сообщения
    this.telegramBot.on('message', async (msg) => {
      const chatId = msg.chat.id.toString();
      const text = msg.text ? msg.text.trim() : '';
      const state = this.conversationState.get(chatId);

      // 1) Команда /start
      if (text === '/start') {
        this.conversationState.delete(chatId);
        await this.telegramBot.sendMessage(chatId, 'Добро пожаловать! Введите, пожалуйста, ваш номер телефона в формате(для KZ: 71234567890, пишите без пробелов и символов просто цифры):');
        this.conversationState.set(chatId, { step: 'awaitingPhone' });
        return;
      }

      // 2) Ждём номер телефона
      if (state && state.step === 'awaitingPhone') {
        const phoneNumber = text;

        // Проверка: содержит ли `phoneNumber` только цифры
        if (!/^\d+$/.test(phoneNumber)) {
          await this.telegramBot.sendMessage(
              chatId,
              'Пожалуйста, введите номер телефона без пробелов и символов. Пример: 77012345678',
          );
          return;
        }

        try {
          const user = await this.userService.findByPhone(phoneNumber);
          if (user) {
            await this.telegramBot.sendMessage(chatId, 'Вы уже зарегистрированы.');
            this.conversationState.delete(chatId);
          } else {
            await this.telegramBot.sendMessage(chatId, 'Пользователь не найден. Для регистрации введите команду /register.');
            this.conversationState.set(chatId, { step: 'awaitingRegistration', phoneNumber });
          }
        } catch (error) {
          await this.telegramBot.sendMessage(chatId, 'Ошибка при проверке номера. Попробуйте ещё раз.');
        }

        return;
      }

      // 3) Команда /register
      if (text === '/register') {
        const regState = this.conversationState.get(chatId);
        if (!regState || regState.step !== 'awaitingRegistration') {
          await this.telegramBot.sendMessage(chatId, 'Сначала введите номер телефона через /start.');
          return;
        }
        // Переходим к сбору firstName
        await this.telegramBot.sendMessage(chatId, 'Введите ваше имя:');
        regState.step = 'awaitingFirstName';
        this.conversationState.set(chatId, regState);
        return;
      }

      // 4) Получаем firstName
      if (state && state.step === 'awaitingFirstName') {
        state.firstName = text;
        state.step = 'awaitingLastName';
        this.conversationState.set(chatId, state);
        await this.telegramBot.sendMessage(chatId, 'Введите вашу фамилию:');
        return;
      }

      // 5) Получаем lastName
      if (state && state.step === 'awaitingLastName') {
        state.lastName = text;
        state.step = 'awaitingEmail';
        this.conversationState.set(chatId, state);
        await this.telegramBot.sendMessage(chatId, 'Введите ваш email:');
        return;
      }

      // 6) Получаем email
      if (state && state.step === 'awaitingEmail') {
        state.email = text;
        state.step = 'awaitingPhotoIdFront';
        this.conversationState.set(chatId, state);
        await this.telegramBot.sendMessage(chatId, 'Отправьте фотографию удостоверения (передняя сторона):');
        return;
      }

      // 7) Фото передней стороны удостоверения
      if (state && state.step === 'awaitingPhotoIdFront' && msg.photo) {
        // Берём самое большое фото
        const photo = msg.photo[msg.photo.length - 1];
        // 7.1) Получаем ссылку на файл в Telegram
        const fileLink = await this.telegramBot.getFileLink(photo.file_id);

        // 7.2) Формируем уникальное имя файла
        const fileExt = extname(fileLink) || '.jpg';
        const uniqueName = `user-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
        const localPath = `./uploads/users/${uniqueName}`;

        // 7.3) Скачиваем файл через axios
        try {
          const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
          fs.writeFileSync(localPath, response.data);
          // Сохраняем URL, который потом пойдёт в БД
          state.photoIdFront = `http://localhost:4000/uploads/users/${uniqueName}`;
        } catch (err) {
          console.error('Ошибка скачивания файла:', err.message);
          await this.telegramBot.sendMessage(chatId, 'Произошла ошибка при скачивании файла. Попробуйте ещё раз.');
          return;
        }

        // Переходим к задней стороне
        state.step = 'awaitingPhotoIdBack';
        this.conversationState.set(chatId, state);
        await this.telegramBot.sendMessage(chatId, 'Отправьте фотографию удостоверения (задняя сторона):');
        return;
      }

      // 8) Фото задней стороны удостоверения
      if (state && state.step === 'awaitingPhotoIdBack' && msg.photo) {
        const photo = msg.photo[msg.photo.length - 1];
        const fileLink = await this.telegramBot.getFileLink(photo.file_id);

        const fileExt = extname(fileLink) || '.jpg';
        const uniqueName = `user-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
        const localPath = `./uploads/users/${uniqueName}`;

        // Скачиваем файл
        try {
          const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
          fs.writeFileSync(localPath, response.data);
          state.photoIdBack = `http://localhost:4000/uploads/users/${uniqueName}`;
        } catch (err) {
          console.error('Ошибка скачивания файла:', err.message);
          await this.telegramBot.sendMessage(chatId, 'Произошла ошибка при скачивании файла. Попробуйте ещё раз.');
          return;
        }

        // Все данные готовы, формируем DTO
        const registerDto: RegisterDto = {
          phoneNumber: state.phoneNumber,
          firstName: state.firstName,
          lastName: state.lastName,
          patronymic: '', // если не нужно отчество, оставляем пустым
          email: state.email,
          idCardFrontImage: state.photoIdFront,
          idCardBackImage: state.photoIdBack,
          code: '', // если не нужен SMS-код, оставляем пустым
          role: 'courier', // или любая другая логика
          telegramChatId: chatId,
        };

        try {
          // Вызываем метод регистрации
          const tokenData = await this.register(registerDto);
          await this.telegramBot.sendMessage(chatId, 'Регистрация прошла успешно!');
        } catch (error) {
          await this.telegramBot.sendMessage(chatId, `Ошибка регистрации: ${error.message}`);
        }

        // Сбрасываем state
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
    const expires = Date.now() + 15 * 60 * 1000; // 15 минут
    this.codes.set(phoneNumber, { code, expires });

    await this.telegramBot.sendMessage(
        user.telegramChatId,
        `Ваш код подтверждения: ${code}`,
    );
    console.log(`Отправляем код ${code} для номера ${phoneNumber} на Telegram chat ${user.telegramChatId}`);
    return { message: 'Код подтверждения отправлен' };
  }

  /**
   * Вход по номеру телефона и коду подтверждения (SMS).
   */
  async login(loginData: { phoneNumber: string; code: string }) {
    const { phoneNumber, code } = loginData;
    const valid = await this.verifyCode(phoneNumber, code);
    if (!valid) {
      throw new UnauthorizedException(errorMessages.auth.wronCredentials);
    }
    const user = await this.userService.findByPhone(phoneNumber);
    if (!user) {
      return {
        registrationRequired: true,
        message: 'Пользователь не найден, необходимо пройти регистрацию',
      };
    }
    return this.generateToken({ id: user.id, phone: user.phoneNumber });
  }

  /**
   * Авторизация по email и паролю (для корпоративных или других сценариев).
   */
  async otherLogin(loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    const user = await this.userService.findByEmail(email, ['roles']);
    if (!user) {
      throw new UnauthorizedException('Пользователь с таким email не найден');
    }

    const isPasswordValid = await this.userService.comparePassword(
        password,
        user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return this.generateToken({ id: user.id, phone: user.phoneNumber });
  }

  /**
   * Регистрация нового пользователя.
   */
  async register(registerDto: RegisterDto) {
    const { phoneNumber } = registerDto;
    // Проверяем, нет ли такого пользователя
    const existingUser = await this.userService.findByPhone(phoneNumber);
    if (existingUser) {
      throw new ConflictException(errorMessages.auth.userAlreadyExist);
    }

    // Создаём пользователя
    const newUser = await this.userService.createUser({
      phoneNumber,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      patronymic: registerDto.patronymic,
      email: registerDto.email,
      // Здесь передаём пути к скачанным фотографиям
      idCardFrontImage: registerDto.idCardFrontImage,
      idCardBackImage: registerDto.idCardBackImage,
      telegramChatId: registerDto.telegramChatId,
    });

    // Назначаем роль
    const courierRole = await this.roleService.findById(1);
    if (!courierRole) {
      throw new NotFoundException('Роль "courier" не найдена');
    }
    await this.roleService.assignRoleToUser({
      roleId: courierRole.id,
      userId: newUser.id,
    });

    return this.generateToken({ id: newUser.id, phone: newUser.phoneNumber });
  }

  /**
   * Генерация JWT-токена (пример).
   */
  async generateToken(payload: PayloadDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.secret'),
    });
    return { accessToken };
  }

  /**
   * Генерация случайного 4-значного кода.
   */
  private generateCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  /**
   * Проверка кода.
   */
  private async verifyCode(phone: string, code: string): Promise<boolean> {
    const record = this.codes.get(phone);
    if (!record) return false;
    if (record.code !== code) return false;
    if (Date.now() > record.expires) {
      this.codes.delete(phone);
      return false;
    }
    // после успешной проверки удаляем код
    this.codes.delete(phone);
    return true;
  }
}