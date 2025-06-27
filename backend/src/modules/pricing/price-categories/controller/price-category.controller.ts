import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PriceCategoryService } from '../services/price-category.service';
import { CreatePriceCategoryDto } from '../dto/create-price-category.dto';
import { UpdatePriceCategoryDto } from '../dto/update-price-category.dto';

@Controller('price-categories')
export class PriceCategoryController {
    constructor(private readonly priceCategoryService: PriceCategoryService) {}

    @Post()
    create(@Body() createDto: CreatePriceCategoryDto) {
        return this.priceCategoryService.create(createDto);
    }

    @Get()
    findAll() {
        return this.priceCategoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.priceCategoryService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdatePriceCategoryDto) {
        return this.priceCategoryService.update(+id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.priceCategoryService.remove(+id);
    }
}