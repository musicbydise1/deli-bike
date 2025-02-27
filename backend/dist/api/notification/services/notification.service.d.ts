import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { User } from '../../../database/entities/user.entity';
export declare class NotificationService {
    private notificationRepository;
    private userRepository;
    constructor(notificationRepository: Repository<Notification>, userRepository: Repository<User>);
    sendNotification(dto: SendNotificationDto): Promise<Notification>;
    getNotificationsByUser(userId: number): Promise<Notification[]>;
}
