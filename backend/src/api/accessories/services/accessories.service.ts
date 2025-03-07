import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accessory } from '../entities/accessory.entity';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../dto/accessory.dto';
import { Bike } from '../../bike/entities/bike.entity';

@Injectable()
export class AccessoriesService {
    constructor(
        @InjectRepository(Accessory)
        private accessoryRepository: Repository<Accessory>,
    ) {}

    async findAll(): Promise<Accessory[]> {
        return this.accessoryRepository.find({ relations: ['bike'] });
    }

    async findById(id: number): Promise<Accessory> {
        const accessory = await this.accessoryRepository.findOne({ where: { id } });
        if (!accessory) {
            throw new NotFoundException(`Accessory with ID ${id} not found`);
        }
        return accessory;
    }

    async createAccessory(dto: CreateAccessoryDto): Promise<Accessory[]> {
        const accessories: Accessory[] = [];
        const bikeIds = Array.isArray(dto.bikeId) ? dto.bikeId : [dto.bikeId];
        for (const id of bikeIds) {
            const accessory = new Accessory();
            accessory.name = dto.name;
            accessory.description = dto.description;
            accessory.price = dto.price;
            // Привязываем аксессуар к велосипеду:
            accessory.bikeId = id;
            accessory.bike = { id } as Bike;
            const saved = await this.accessoryRepository.save(accessory);
            accessories.push(saved);
        }
        return accessories;
    }

    async updateAccessory(id: number, dto: UpdateAccessoryDto): Promise<Accessory> {
        const accessory = await this.findById(id);
        Object.assign(accessory, dto);
        return this.accessoryRepository.save(accessory);
    }

    async deleteAccessory(id: number): Promise<void> {
        await this.accessoryRepository.delete(id);
    }
}