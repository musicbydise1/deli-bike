import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private readonly repository: Repository<Company>) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    const company = this.repository.create(dto);
    return this.repository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.repository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Company> {
    return this.repository.findOne({ where: { id }, relations: ['users'] });
  }
}
