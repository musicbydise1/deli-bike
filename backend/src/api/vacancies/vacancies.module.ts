import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { VacanciesService } from './services/vacancies.service';
import { VacanciesController } from './controllers/vacancies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  providers: [VacanciesService],
  controllers: [VacanciesController],
  exports: [VacanciesService],
})
export class VacanciesModule {}
