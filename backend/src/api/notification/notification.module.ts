import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { NotificationService } from "./services/notification.service";
import { NotificationController } from "./controllers/notification.controller";
import { UserModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UserModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
