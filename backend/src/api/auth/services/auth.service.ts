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


@Injectable()
export class AuthService {
  // In-memory хранилище для SMS-кодов: { phone: { code, expires } }
  private codes: Map<string, { code: string; expires: number }> = new Map();

  private telegramBot: TelegramBot;

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
      if (msg.text && msg.text.startsWith('/start')) {
        const chatId = msg.chat.id.toString();
        // Ожидаем, что после /start через пробел передается номер телефона
        const parts = msg.text.split(' ');
        if (parts.length < 2) {
          await this.telegramBot.sendMessage(chatId, 'Пожалуйста, передайте ваш номер телефона, например: /start +79161234567');
          return;
        }
        const phoneNumber = parts[1].trim();
        try {
          // Вызываем метод сервиса, который обновляет пользователя по номеру телефона и сохраняет chatId
          await this.userService.updateUserTelegramChatId(phoneNumber, chatId);
          await this.telegramBot.sendMessage(chatId, 'Ваш Telegram чат успешно привязан к аккаунту.');
        } catch (error) {
          await this.telegramBot.sendMessage(chatId, 'Ошибка при привязке Telegram чата. Проверьте правильность номера.');
        }
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
    const { phoneNumber } = registerDto; // поле code исключено из регистрации

    // Проверяем, существует ли уже пользователь с таким номером телефона
    const existingUser = await this.userService.findByPhone(phoneNumber);
    if (existingUser) {
      throw new ConflictException(errorMessages.auth.userAlreadyExist);
    }

    // Создаём нового пользователя (без поля code)
    const newUser = await this.userService.createUser({
      phoneNumber,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      patronymic: registerDto.patronymic,
      email: registerDto.email,
      photoIdFront: registerDto.idCardFrontImage,
      photoIdBack: registerDto.idCardBackImage,
    });

    // Получаем роль "courier" (например, если роль "courier" имеет id = 1)
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