import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SucessResponseInterceptor } from 'src/common/helper/sucess-response.interceptor';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { BikeModule } from "./bike/bike.module";
import { RentalModule } from "./rental/rental.module";
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { AdminModule } from "./admin/admin.module";
import { ReviewModule } from "./review/review.module";
import { MaintenanceModule } from "./maintenance/maintenance.module";
import { ErrorsFilter } from 'src/errors/errors.filter';

@Module({
  imports: [AuthModule, UserModule, RoleModule, ProductModule, BikeModule, RentalModule, PaymentModule, NotificationModule, AdminModule, ReviewModule, MaintenanceModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SucessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
  ],
})
export class ApiModule {}
