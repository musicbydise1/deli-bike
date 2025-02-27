import { NotificationService } from '../services/notification.service';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { Notification } from '../entities/notification.entity';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendNotification(dto: SendNotificationDto): Promise<Notification>;
    getUserNotifications(userId: number): Promise<Notification[]>;
}
