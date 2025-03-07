import { ConfigService } from '@nestjs/config';
export declare class BitrixService {
    private configService;
    private webhookUrl;
    constructor(configService: ConfigService);
    createLead(leadData: {
        title: string;
        name: string;
        phone: string;
        email: string;
        comment?: string;
    }): Promise<any>;
}
