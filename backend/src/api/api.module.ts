import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SucessResponseInterceptor } from 'src/common/helper/sucess-response.interceptor';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { BikeModule } from "./bike/bike.module";
import { RentalModule } from "./rental/rental.module";
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { AdminModule } from "./admin/admin.module";
import { ReviewModule } from "./review/review.module";
import { MaintenanceModule } from "./maintenance/maintenance.module";
import { ErrorsFilter } from 'src/errors/errors.filter';
import {BitrixModule} from "./bitrix/bitrix.module";
import { PriceCategoryModule} from "./price-category/price-category.module";
import {AccessoriesModule} from "./accessories/accessories.module";
import {VacanciesModule} from "./vacancies/vacancies.module";
import {TariffsModule} from "./tariffs/tariffs.module";

@Module({
  imports: [AuthModule, UserModule, RoleModule,
    BikeModule, RentalModule, PaymentModule, NotificationModule,
    AdminModule, ReviewModule, MaintenanceModule, BitrixModule, PriceCategoryModule,
    AccessoriesModule, VacanciesModule, TariffsModule],
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
