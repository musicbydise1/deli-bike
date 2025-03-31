import { Controller, Get } from '@nestjs/common';
import { Auth } from '../../auth/guards/auth.decorator';
import { CurrentUser } from '../../auth/guards/user.decorator';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  async profile(@CurrentUser() user) {
    // Получаем пользователя с ролями из базы данных
    const userWithRoles = await this.userService.findById(user.id, { relations: ['roles'] });

    // Ручная сериализация
    const serializedUser = {
      id: userWithRoles.id,
      email: userWithRoles.email,
      firstName: userWithRoles.firstName,
      lastName: userWithRoles.lastName,
      patronymic: userWithRoles.patronymic,
      phoneNumber: userWithRoles.phoneNumber,
      companyName: userWithRoles.companyName,
      telegramChatId: userWithRoles.telegramChatId,
      idCardNumber: userWithRoles.idCardNumber,
      idCardFrontImage: userWithRoles.idCardFrontImage,
      idCardBackImage: userWithRoles.idCardBackImage,
      isVerified: userWithRoles.isVerified,
      profileImage: userWithRoles.profileImage,
      address: userWithRoles.address,
      subscriptionType: userWithRoles.subscriptionType,
      createdAt: userWithRoles.createdAt,
      updatedAt: userWithRoles.updatedAt,
      roles: userWithRoles.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    };

    console.log('Serialized User:', serializedUser); // Логируем результат для отладки
    return serializedUser; // Возвращаем сериализованный объект
  }
}
