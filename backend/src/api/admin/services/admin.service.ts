import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateBikeDto } from '../dto/create-bike.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Bike)
        private bikeRepository: Repository<Bike>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async createBike(createBikeDto: CreateBikeDto): Promise<Bike> {
        const bike = this.bikeRepository.create(createBikeDto);
        return this.bikeRepository.save(bike);
    }

    async deleteBike(id: number): Promise<void> {
        const bike = await this.bikeRepository.findOne({ where: { id } });
        if (!bike) {
            throw new NotFoundException(`Bike with ID ${id} not found`);
        }

        await this.bikeRepository.remove(bike);
    }

    async getAnalytics(): Promise<any> {
        const totalUsers = await this.userRepository.count();
        const activeBikes = await this.bikeRepository.count({ where: { availability_status: 'available' } });
        return { totalUsers, activeBikes };
    }
}