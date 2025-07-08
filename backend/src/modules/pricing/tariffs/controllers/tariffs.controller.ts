import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TariffsService } from '../services/tariffs.service';
import { Tariff } from '../entities/tariff.entity';
import { CreateTariffDto, UpdateTariffDto } from '../dto/tariff.dto';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}

  @Get()
  async findAll(): Promise<Tariff[]> {
    return this.tariffsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Tariff> {
    return this.tariffsService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateTariffDto): Promise<Tariff> {
    return this.tariffsService.createTariff(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateTariffDto): Promise<Tariff> {
    return this.tariffsService.updateTariff(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.tariffsService.deleteTariff(id);
  }
}
