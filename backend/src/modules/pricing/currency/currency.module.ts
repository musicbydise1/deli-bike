import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Currency } from "./entities/currency.entity";
import { CurrencyController } from "./controllers/currency.controller";
import { CurrencyService } from "./services/currency.service";

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService, TypeOrmModule],
})
export class CurrencyModule {}
