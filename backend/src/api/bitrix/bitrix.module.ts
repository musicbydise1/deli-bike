import { Module } from '@nestjs/common';
import { LeadController } from './bitrix.controller';
import { BitrixService } from './bitrix.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [LeadController],
  providers: [BitrixService],
})
export class BitrixModule {}
