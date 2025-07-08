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
      companyName?: string;
      comment?: string;
    },
  ): Promise<{ leadId: number; message: string }> {
    const result = await this.bitrixService.createLead(leadData);
    return { leadId: result.id, message: 'Лид успешно создан в Битрикс24' };
  }
}
