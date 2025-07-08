import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { User } from '../../../modules/users/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendNotification(dto: SendNotificationDto): Promise<Notification> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }

    const notification = this.notificationRepository.create({
      user,
      type: dto.type,
      message: dto.message,
      status: 'pending',
    });

    // Логика отправки (заглушка)
    notification.status = 'sent';

    return this.notificationRepository.save(notification);
  }

  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
