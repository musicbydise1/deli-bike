import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from './entities/bike.entity';
import { BikeService } from './services/bike.service';
import { BikeController } from './controllers/bike.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Bike])],
    controllers: [BikeController],
    providers: [BikeService],
})
export class BikeModule {}