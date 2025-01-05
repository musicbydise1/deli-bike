import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { UserModule } from '../user/user.module'; // Импорт модуля пользователей
import { Rental } from '../rental/entities/rental.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment, Rental]),
        UserModule, // Подключение модуля пользователей
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}