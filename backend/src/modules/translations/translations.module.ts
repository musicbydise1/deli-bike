// translations.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationsService } from './service/translations.service';
import { Translation } from './entity/translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Translation])],
  providers: [TranslationsService],
  exports: [TranslationsService], // <-- важно, чтобы экспортировать сервис
})
export class TranslationsModule {}
