import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() dto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(dto);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }
}
