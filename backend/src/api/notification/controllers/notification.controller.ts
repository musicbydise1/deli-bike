import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { Notification } from '../entities/notification.entity';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    async sendNotification(@Body() dto: SendNotificationDto): Promise<Notification> {
        return this.notificationService.sendNotification(dto);
    }

    @Get('/user/:userId')
    async getUserNotifications(@Param('userId') userId: number): Promise<Notification[]> {
        return this.notificationService.getNotificationsByUser(userId);
    }
}