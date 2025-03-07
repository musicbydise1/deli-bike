import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { CreateVacancyDto, UpdateVacancyDto } from '../dto/vacancy.dto';
export declare class VacanciesService {
    private vacancyRepository;
    constructor(vacancyRepository: Repository<Vacancy>);
    findAll(): Promise<Vacancy[]>;
    findById(id: number): Promise<Vacancy>;
    createVacancy(dto: CreateVacancyDto): Promise<Vacancy>;
    updateVacancy(id: number, dto: UpdateVacancyDto): Promise<Vacancy>;
    deleteVacancy(id: number): Promise<void>;
}
