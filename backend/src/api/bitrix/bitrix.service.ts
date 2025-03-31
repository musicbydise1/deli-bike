import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class BitrixService {
    private webhookUrl: string;

    constructor(private configService: ConfigService) {
        // Получаем URL вебхука для доступа к REST API Битрикс24
        // Например: https://yourdomain.bitrix24.ru/rest/1/your_webhook_code
        this.webhookUrl = 'https://mdline.bitrix24.kz/rest/9/7c7xusn6aab7mls9/';
    }

    /**
     * Создание лида в Битрикс24.
     * @param leadData Данные лида, например: { title, name, phone, email, companyName, comment }
     */
    async createLead(leadData: {
        title: string;
        name: string;
        phone: string;
        email: string;
        companyName?: string;
        comment?: string;
    }): Promise<any> {
        const url = `${this.webhookUrl}/crm.lead.add.json`;

        // Формирование payload согласно документации Битрикс24
        const payload = {
            fields: {
                TITLE: leadData.title, // например, "Новый лид с сайта"
                NAME: leadData.name,
                PHONE: [{ VALUE: leadData.phone, VALUE_TYPE: 'WORK' }],
                EMAIL: [{ VALUE: leadData.email, VALUE_TYPE: 'WORK' }],
                COMMENTS: leadData.comment || '',
                // Если companyName передан, добавляем его в поля лида
                ...(leadData.companyName && { COMPANY_TITLE: leadData.companyName }),
            },
            params: { REGISTER_SONET_EVENT: 'Y' },
        };

        try {
            const response = await axios.post(url, payload);
            if (response.data.result) {
                return response.data.result;
            } else {
                throw new InternalServerErrorException('Ошибка при создании лида в Битрикс24');
            }
        } catch (error) {
            console.error('Ошибка при создании лида:', error);
            throw new InternalServerErrorException('Ошибка интеграции с Битрикс24');
        }
    }
}