export class CreateVacancyDto {
  title: string;
  description: string;
  salary?: number;
}

export class UpdateVacancyDto {
  title?: string;
  description?: string;
  salary?: number;
}
