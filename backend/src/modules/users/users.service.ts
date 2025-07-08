import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../../database/entities/role.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  public async createUser(body: CreateUserDto, ...roles: Role[]): Promise<User> {
    const data: Partial<User> = { ...body };

    if (body.password) {
      data.password = await hash(body.password, 10);
    }

    const user: User = this.repository.create({
      ...data,
      roles,
    });

    return this.repository.save(user);
  }

  public async findByEmail(email: string, relations?: string[]): Promise<User> {
    const user: User = await this.repository.findOne({
      where: { email },
      relations, // Здесь теперь ожидается массив строк
    });
    return user;
  }

  // Добавленный метод для поиска пользователя по номеру телефона
  public async findByPhone(phoneNumber: string, relations?: string[]): Promise<User> {
    const user: User = await this.repository.findOne({
      where: { phoneNumber },
      relations,
    });
    return user;
  }

  public async comparePassword(password: string, userPassword: string): Promise<boolean> {
    return compare(password, userPassword);
  }

  public async findById(id: number, options?: { relations?: string[] }): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: options?.relations || ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async save(user: User) {
    return this.repository.save(user);
  }

  async updateUserTelegramChatId(phoneNumber: string, chatId: string): Promise<void> {
    // Ищем пользователя по номеру телефона
    const user = await this.repository.findOne({ where: { phoneNumber } });

    if (!user) {
      throw new NotFoundException('Пользователь с таким номером телефона не найден.');
    }

    // Обновляем поле telegramChatId
    user.telegramChatId = chatId;
    await this.repository.save(user);
  }
}
