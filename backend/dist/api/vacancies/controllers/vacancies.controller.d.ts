import { VacanciesService } from '../services/vacancies.service';
import { Vacancy } from '../entities/vacancy.entity';
import { CreateVacancyDto, UpdateVacancyDto } from '../dto/vacancy.dto';
export declare class VacanciesController {
    private readonly vacanciesService;
    constructor(vacanciesService: VacanciesService);
    findAll(): Promise<Vacancy[]>;
    findById(id: number): Promise<Vacancy>;
    create(dto: CreateVacancyDto): Promise<Vacancy>;
    update(id: number, dto: UpdateVacancyDto): Promise<Vacancy>;
    delete(id: number): Promise<void>;
}
