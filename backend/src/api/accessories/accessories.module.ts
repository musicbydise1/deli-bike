import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessory } from './entities/accessory.entity';
import { AccessoriesService } from './services/accessories.service';
import { AccessoriesController } from './controllers/accessories.controller';
import { Bike } from '@/modules/bikes/entities/bike.entity';
import { AccessoriesPrice } from './entities/accessories_price.entity';
import { TranslationsModule } from '@/modules/translations/translations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accessory, Bike, AccessoriesPrice]),
    TranslationsModule, // <-- добавляем
  ],
  providers: [AccessoriesService],
  controllers: [AccessoriesController],
  exports: [AccessoriesService],
})
export class AccessoriesModule {}
