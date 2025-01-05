import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BikeService } from '../services/bike.service';
import { Bike } from '../entities/bike.entity';
import { CreateBikeDto } from '../dto/create-bike.dto';

@Controller('bikes')
export class BikeController {
    constructor(private readonly bikeService: BikeService) {}

    @Get()
    async getAllBikes(): Promise<Bike[]> {
        return this.bikeService.findAll();
    }

    @Post()
    async createBike(@Body() bikeData: CreateBikeDto): Promise<Bike> {
        return this.bikeService.createBike(bikeData);
    }

    @Put(':id')
    async updateBike(
        @Param('id') id: number,
        @Body() bikeData: Partial<CreateBikeDto>,
    ): Promise<Bike> {
        return this.bikeService.updateBike(id, bikeData);
    }

    @Delete(':id')
    async deleteBike(@Param('id') id: number): Promise<void> {
        return this.bikeService.deleteBike(id);
    }
}