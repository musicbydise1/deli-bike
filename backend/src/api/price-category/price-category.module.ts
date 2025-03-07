import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceCategory } from './entities/price-category.entity';
import { PriceCategoryService } from './services/price-category.service';
import { PriceCategoryController } from './controller/price-category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PriceCategory])],
    controllers: [PriceCategoryController],
    providers: [PriceCategoryService],
    exports: [PriceCategoryService],
})
export class PriceCategoryModule {}