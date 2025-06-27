import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vacancy } from "../entities/vacancy.entity";
import { CreateVacancyDto, UpdateVacancyDto } from "../dto/vacancy.dto";

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>
  ) {}

  async findAll(): Promise<Vacancy[]> {
    return this.vacancyRepository.find();
  }

  async findById(id: number): Promise<Vacancy> {
    const vacancy = await this.vacancyRepository.findOne({ where: { id } });
    if (!vacancy) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
    return vacancy;
  }

  async createVacancy(dto: CreateVacancyDto): Promise<Vacancy> {
    const vacancy = this.vacancyRepository.create(dto);
    return this.vacancyRepository.save(vacancy);
  }

  async updateVacancy(id: number, dto: UpdateVacancyDto): Promise<Vacancy> {
    const vacancy = await this.findById(id);
    Object.assign(vacancy, dto);
    return this.vacancyRepository.save(vacancy);
  }

  async deleteVacancy(id: number): Promise<void> {
    await this.vacancyRepository.delete(id);
  }
}
