import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto, RegisterDto } from '../dto/auth.dto';
import { UserService } from 'src/api/user/services/user.service';
import { errorMessages } from 'src/errors/custom';
import { Role } from 'src/database/entities/role.entity';
import { RoleService } from 'src/api/role/services/role.service';
import * as TelegramBot from 'node-telegram-bot-api';


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
    // Если требуется polling можно указать { polling: true } или использовать webhook
    this.telegramBot = new TelegramBot(telegramToken, { polling: true });

    this.telegramBot.on('message', async (msg) => {
      const chatId = msg.chat.id.toString();
      const text = msg.text ? msg.text.trim() : '';

      // Если получена команда /start
      if (text === '/start') {
        // Сбрасываем состояние для данного чата
        this.conversationState.delete(chatId);
        await this.telegramBot.sendMessage(chatId, 'Добро пожаловать! Введите, пожалуйста, ваш номер телефона:');
        this.conversationState.set(chatId, { step: 'awaitingPhone' });
        return;
      }

      // Если ожидаем номер телефона
      const state = this.conversationState.get(chatId);
      if (state && state.step === 'awaitingPhone') {
        const phoneNumber = text;
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

      // Если получена команда /register
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

      // Если идёт процесс регистрации
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

      // Если ожидается фото передней стороны удостоверения
      if (state && state.step === 'awaitingPhotoIdFront' && msg.photo) {
        // Выбираем самое большое фото из массива
        const photo = msg.photo[msg.photo.length - 1];
        state.photoIdFront = photo.file_id;
        state.step = 'awaitingPhotoIdBack';
        this.conversationState.set(chatId, state);
        await this.telegramBot.sendMessage(chatId, 'Отправьте фотографию удостоверения (задняя сторона):');
        return;
      }

      // Если ожидается фото задней стороны удостоверения
      // Если ожидается фото задней стороны удостоверения
      if (state && state.step === 'awaitingPhotoIdBack' && msg.photo) {
        const photo = msg.photo[msg.photo.length - 1];
        state.photoIdBack = photo.file_id;
        // Формируем данные для регистрации с дополнительными полями
        const registerDto: RegisterDto = {
          phoneNumber: state.phoneNumber,
          firstName: state.firstName,
          lastName: state.lastName,
          patronymic: '', // если не требуется, можно оставить пустым
          email: state.email,
          idCardFrontImage: state.photoIdFront,
          idCardBackImage: state.photoIdBack,
          code: '',      // значение по умолчанию
          role: 'courier',  // значение по умолчанию или другое, подходящее вашему приложению
          iin: chatId
        };
        try {
          // Вызываем метод регистрации
          const tokenData = await this.register(registerDto);
          await this.telegramBot.sendMessage(chatId, 'Регистрация прошла успешно!');
        } catch (error) {
          await this.telegramBot.sendMessage(chatId, `Ошибка регистрации: ${error.message}`);
        }
        // Сбрасываем состояние для данного чата
        this.conversationState.delete(chatId);
        return;
      }
    });

  }

  /**
   * Отправка SMS с кодом подтверждения на указанный номер телефона.
   * В production-системе здесь следует интегрироваться с SMS-провайдером (например, Twilio).
   */
  async sendCode(phoneNumber: string) {
    // Ищем пользователя по номеру телефона
    const user = await this.userService.findByPhone(phoneNumber);
    if (!user || !user.iin) {
      throw new NotFoundException('Пользователь не найден или не привязан Telegram-чат');
    }

    const code = this.generateCode();
    const expires = Date.now() + 15 * 60 * 1000; // код действителен 15 минут
    this.codes.set(phoneNumber, { code, expires });

    // Отправляем код в Telegram на сохранённый chatId пользователя
    await this.telegramBot.sendMessage(user.iin, `Ваш код подтверждения: ${code}`);
    console.log(`Отправляем код ${code} для номера ${phoneNumber} на Telegram chat ${user.iin}`);
    return { message: 'Код подтверждения отправлен' };
  }

  /**
   * Вход по номеру телефона и коду подтверждения.
   * Если код верный и пользователь найден – возвращается JWT-токен.
   * Если пользователь не найден – возвращается признак, что требуется регистрация.
   */
  async login(loginData: { phoneNumber: string; code: string }) {
    const { phoneNumber, code } = loginData;
    const valid = await this.verifyCode(phoneNumber, code);
    if (!valid) {
      throw new UnauthorizedException(errorMessages.auth.wronCredentials);
    }
    const user = await this.userService.findByPhone(phoneNumber);
    if (!user) {
      // Если пользователя с таким номером нет, клиенту возвращается сообщение, что требуется регистрация
      return { registrationRequired: true, message: 'Пользователь не найден, необходимо пройти регистрацию' };
    }
    return this.generateToken({ id: user.id, phone: user.phoneNumber });
  }

  /**
   * Авторизация по email и password (для корпоративных клиентов или других сценариев).
   */
  async otherLogin(loginData: { email: string; password: string }) {
    const { email, password } = loginData;

    // Ищем пользователя по email с загрузкой ролей
    const user = await this.userService.findByEmail(email, ['roles']);
    if (!user) {
      throw new UnauthorizedException("Пользователь с таким email не найден");
    }

    // Сравниваем переданный пароль с сохранённым (предполагается, что в UserService реализована функция сравнения)
    const isPasswordValid = await this.userService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Неверный пароль");
    }

    return this.generateToken({ id: user.id, phone: user.phoneNumber });
  }

  /**
   * Регистрация нового пользователя.
   * Ожидается, что RegisterDto содержит следующие поля:
   * - phone: string
   * - code: string
   * - firstName: string
   * - lastName: string
   * - patronymic: string
   * - email: string
   * - photoIdFront: string (ссылка или base64)
   * - photoIdBack: string (ссылка или base64)
   */
  async register(registerDto: RegisterDto) {
    const { phoneNumber } = registerDto;
    const existingUser = await this.userService.findByPhone(phoneNumber);
    if (existingUser) {
      throw new ConflictException(errorMessages.auth.userAlreadyExist);
    }

    // Передаем chatId (например, registerDto.iin) при создании пользователя
    const newUser = await this.userService.createUser({
      phoneNumber,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      patronymic: registerDto.patronymic,
      email: registerDto.email,
      photoIdFront: registerDto.idCardFrontImage,
      photoIdBack: registerDto.idCardBackImage,
      iin: registerDto.iin, // сохраняем Telegram chatId, если поле называется "iin"
    });

    // Получаем роль "courier"
    const courierRole = await this.roleService.findById(1);
    if (!courierRole) {
      throw new NotFoundException('Роль "courier" не найдена');
    }

    // Назначаем пользователю роль курьера
    await this.roleService.assignRoleToUser({
      roleId: courierRole.id,
      userId: newUser.id,
    });

    return this.generateToken({ id: newUser.id, phone: newUser.phoneNumber });
  }


  /**
   * Генерация JWT-токена.
   * В качестве полезной нагрузки передаём идентификатор пользователя и номер телефона.
   */
  async generateToken(payload: PayloadDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.secret'),
    });
    return { accessToken };
  }

  /**
   * Генерация случайного 4-значного кода подтверждения.
   */
  private generateCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  /**
   * Проверка корректности кода для заданного номера телефона.
   * Если код корректен и не просрочен – он удаляется из хранилища.
   */
  private async verifyCode(phone: string, code: string): Promise<boolean> {
    const record = this.codes.get(phone);
    if (!record) return false;
    if (record.code !== code) return false;
    if (Date.now() > record.expires) {
      this.codes.delete(phone);
      return false;
    }
    // Удаляем код после успешной проверки, чтобы его нельзя было использовать повторно
    this.codes.delete(phone);
    return true;
  }
}