import { Controller, Post, Patch, Param, Body, Get } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { RentalService } from '../services/rental.service';
import { CreateRentalDto } from '../dto/create-rental.dto';
import { Rental } from '../entities/rental.entity';

@Controller('rentals')
export class RentalController {
    constructor(private readonly rentalService: RentalService) {}

    @Post()
    async createRental(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
        return this.rentalService.createRental(createRentalDto);
    }

    @Patch(':id/complete')
    async completeRental(@Param('id', ParseIntPipe) id: number): Promise<Rental> {
        return this.rentalService.completeRental(id);
    }

    @Get()
    async getAllRentals(): Promise<Rental[]> {
        return this.rentalService.getAllRentals();
    }

    @Get('/active')
    async getActiveRentals(): Promise<Rental[]> {
        return this.rentalService.getActiveRentals();
    }

    @Get('/user/:userId')
    async getRentalsByUser(@Param('userId') userId: number): Promise<Rental[]> {
        return this.rentalService.getRentalsByUser(userId);
    }

    @Get('/user/:userId/history')
    async getUserRentalHistory(@Param('userId') userId: number): Promise<Rental[]> {
        return this.rentalService.getUserRentalHistory(userId);
    }

    @Patch(':id/cancel')
    async cancelRental(@Param('id') id: number): Promise<Rental> {
        return this.rentalService.cancelRental(id);
    }

    @Get(':id')
    async getRentalById(@Param('id') id: number): Promise<Rental> {
        return this.rentalService.getRentalById(id);
    }

    @Get('/bikes/:bikeId/availability')
    async checkBikeAvailability(@Param('bikeId') bikeId: number): Promise<boolean> {
        return this.rentalService.isBikeAvailable(bikeId);
    }
}