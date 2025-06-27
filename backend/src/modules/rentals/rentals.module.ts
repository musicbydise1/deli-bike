import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalService } from './rentals.service';
import { RentalController } from './rentals.controller';
import { Bike } from '../bikes/entities/bike.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rental, Bike])],
    controllers: [RentalController],
    providers: [RentalService],
    exports: [TypeOrmModule],
})
export class RentalModule {}