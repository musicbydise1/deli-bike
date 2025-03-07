import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceCategory } from '../entities/price-category.entity';
import { CreatePriceCategoryDto } from '../dto/create-price-category.dto';
import { UpdatePriceCategoryDto } from '../dto/update-price-category.dto';

@Injectable()
export class PriceCategoryService {
    constructor(
        @InjectRepository(PriceCategory)
        private readonly priceCategoryRepository: Repository<PriceCategory>,
    ) {}

    async create(createDto: CreatePriceCategoryDto): Promise<PriceCategory> {
        const category = this.priceCategoryRepository.create(createDto);
        return await this.priceCategoryRepository.save(category);
    }

    async findAll(): Promise<PriceCategory[]> {
        return await this.priceCategoryRepository.find();
    }

    async findOne(id: number): Promise<PriceCategory> {
        const category = await this.priceCategoryRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException(`Price category with id ${id} not found`);
        }
        return category;
    }

    async update(id: number, updateDto: UpdatePriceCategoryDto): Promise<PriceCategory> {
        await this.priceCategoryRepository.update(id, updateDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.priceCategoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Price category with id ${id} not found`);
        }
    }
}