import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalService } from './services/rental.service';
import { RentalController } from './controllers/rental.controller';
import { Bike } from '../bike/entities/bike.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rental, Bike])],
    controllers: [RentalController],
    providers: [RentalService],
    exports: [TypeOrmModule],
})
export class RentalModule {}