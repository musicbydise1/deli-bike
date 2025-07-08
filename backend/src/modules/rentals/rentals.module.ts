import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalService } from './rentals.service';
import { RentalController } from './rentals.controller';
import { Bike } from '../bikes/entities/bike.entity';
import { UserModule } from '@/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Bike]), UserModule],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [TypeOrmModule],
})
export class RentalModule {}
