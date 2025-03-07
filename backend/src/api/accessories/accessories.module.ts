import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessory } from './entities/accessory.entity';
import { AccessoriesService } from './services/accessories.service';
import { AccessoriesController } from './controllers/accessories.controller';
import {Bike} from "../bike/entities/bike.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Accessory, Bike])],
    providers: [AccessoriesService],
    controllers: [AccessoriesController],
    exports: [AccessoriesService],
})
export class AccessoriesModule {}