import { Body, Controller, Post } from '@nestjs/common';
import { BitrixService } from './bitrix.service';

@Controller('lead')
export class LeadController {
  constructor(private readonly bitrixService: BitrixService) {}

  @Post()
  async createLead(
    @Body()
    leadData: {
      title: string;
      name: string;
      phone: string;
      email: string;
      comment?: string;
    },
  ) {
    const leadId = await this.bitrixService.createLead(leadData);
    return { leadId, message: 'Лид успешно создан в Битрикс24' };
  }
}
