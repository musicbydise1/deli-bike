import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VacanciesService } from '../services/vacancies.service';
import { Vacancy } from '../entities/vacancy.entity';
import { CreateVacancyDto, UpdateVacancyDto } from '../dto/vacancy.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Get()
  async findAll(): Promise<Vacancy[]> {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Vacancy> {
    return this.vacanciesService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateVacancyDto): Promise<Vacancy> {
    return this.vacanciesService.createVacancy(dto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateVacancyDto): Promise<Vacancy> {
    return this.vacanciesService.updateVacancy(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.vacanciesService.deleteVacancy(id);
  }
}
