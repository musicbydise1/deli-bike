import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from './entities/bike.entity';
import { BikeService } from './bikes.service';
import { BikeController } from './bikes.controller';
import { BikePrice } from './entities/bike_price.entity';
import { TranslationsModule } from '@/modules/translations/translations.module';
import { Translation } from '@/modules/translations/entity/translations.entity';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bike, BikePrice, Translation]), TranslationsModule, AuthModule, UserModule],
  controllers: [BikeController],
  providers: [BikeService],
  exports: [BikeService],
})
export class BikeModule {}
