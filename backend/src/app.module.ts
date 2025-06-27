import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmConfigService } from "./database/typeorm/typeorm.service";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/users/users.module";
import { BikeModule } from "./modules/bikes/bikes.module";
import { RentalModule } from "./modules/rentals/rentals.module";
import { CompaniesModule } from "./modules/companies/companies.module";
import { PricingModule } from "./modules/pricing/pricing.module";
import { AdminModule } from "./modules/admin/admin.module";
import { MulterModule } from "@nestjs/platform-express";
import { configuration } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MulterModule.register({
      dest: "./uploads", // Папка для сохранения загруженных файлов
    }),
    AuthModule,
    UserModule,
    BikeModule,
    RentalModule,
    CompaniesModule,
    PricingModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
