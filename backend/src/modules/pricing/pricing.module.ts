import { Module } from '@nestjs/common';
import { PriceCategoryModule } from './price-categories/price-categories.module';
import { TariffsModule } from './tariffs/tariffs.module';
import { PaymentModule } from './payment/payment.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [PriceCategoryModule, TariffsModule, PaymentModule, CurrencyModule],
  exports: [PriceCategoryModule, TariffsModule, PaymentModule, CurrencyModule],
})
export class PricingModule {}
