import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceCategory } from "./entities/price-category.entity";
import { PriceCategoryService } from "./services/price-category.service";
import { PriceCategoryController } from "./controller/price-category.controller";
import { TranslationsModule } from "../../translations/translations.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PriceCategory]),
    TranslationsModule, // <-- Добавляем сюда
  ],
  controllers: [PriceCategoryController],
  providers: [PriceCategoryService],
  exports: [PriceCategoryService],
})
export class PriceCategoryModule {}
