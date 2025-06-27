export class CreateTariffDto {
  bikeId: number;
  name: string;
  price: number;
  duration: number;
}

export class UpdateTariffDto {
  name?: string;
  price?: number;
  duration?: number;
}
