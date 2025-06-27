import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Currency } from "../entities/currency.entity";
import { CreateCurrencyDto } from "../dto/create-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly repository: Repository<Currency>
  ) {}

  create(dto: CreateCurrencyDto): Promise<Currency> {
    const currency = this.repository.create(dto);
    return this.repository.save(currency);
  }

  findAll(): Promise<Currency[]> {
    return this.repository.find();
  }
}
