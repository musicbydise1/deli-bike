import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tariff } from './entities/tariff.entity';
import { TariffsService } from './services/tariffs.service';
import { TariffsController } from './controllers/tariffs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Tariff])],
    providers: [TariffsService],
    controllers: [TariffsController],
    exports: [TariffsService],
})
export class TariffsModule {}