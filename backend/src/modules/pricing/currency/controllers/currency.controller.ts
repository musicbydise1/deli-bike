import { Controller, Post, Body, Get } from "@nestjs/common";
import { CurrencyService } from "../services/currency.service";
import { CreateCurrencyDto } from "../dto/create-currency.dto";
import { Currency } from "../entities/currency.entity";

@Controller("currencies")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  create(@Body() dto: CreateCurrencyDto): Promise<Currency> {
    return this.currencyService.create(dto);
  }

  @Get()
  findAll(): Promise<Currency[]> {
    return this.currencyService.findAll();
  }
}
