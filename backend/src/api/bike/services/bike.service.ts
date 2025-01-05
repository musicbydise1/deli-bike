import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../entities/bike.entity';
import { CreateBikeDto } from '../dto/create-bike.dto';

@Injectable()
export class BikeService {
    constructor(
        @InjectRepository(Bike)
        private bikeRepository: Repository<Bike>,
    ) {}

    async findAll(): Promise<Bike[]> {
        return this.bikeRepository.find({ where: { availability_status: 'available' } });
    }

    async createBike(bikeData: CreateBikeDto): Promise<Bike> {
        const bike = this.bikeRepository.create(bikeData);
        return this.bikeRepository.save(bike);
    }

    async updateBike(id: number, bikeData: Partial<CreateBikeDto>): Promise<Bike> {
        await this.bikeRepository.update(id, bikeData);
        return this.bikeRepository.findOne({ where: { id } });
    }

    async deleteBike(id: number): Promise<void> {
        await this.bikeRepository.delete(id);
    }
}