import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AccessoriesService } from '../services/accessories.service';
import { Accessory } from '../entities/accessory.entity';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../dto/accessory.dto';

@Controller('accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Get()
  async findAll(): Promise<Accessory[]> {
    return this.accessoriesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Accessory> {
    return this.accessoriesService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateAccessoryDto): Promise<Accessory[]> {
    console.log(dto);
    return this.accessoriesService.createAccessory(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAccessoryDto): Promise<Accessory> {
    return this.accessoriesService.updateAccessory(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.accessoriesService.deleteAccessory(id);
  }
}
