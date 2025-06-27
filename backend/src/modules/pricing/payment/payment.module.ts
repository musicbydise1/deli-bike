import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./services/payment.service";
import { PaymentController } from "./controllers/payment.controller";
import { UserModule } from "../../users/users.module";
import { Rental } from "../../rentals/entities/rental.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Rental]),
    UserModule, // Подключение модуля пользователей
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
