import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessory } from './entities/accessory.entity';
import { AccessoriesService } from './services/accessories.service';
import { AccessoriesController } from './controllers/accessories.controller';
import {Bike} from "../bike/entities/bike.entity";
import {TranslationsModule} from "../translations/translations.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Accessory, Bike]),
        TranslationsModule, // <-- добавляем
    ],
    providers: [AccessoriesService],
    controllers: [AccessoriesController],
    exports: [AccessoriesService],
})
export class AccessoriesModule {}