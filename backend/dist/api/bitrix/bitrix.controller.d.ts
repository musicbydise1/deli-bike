import { BitrixService } from './bitrix.service';
export declare class LeadController {
    private readonly bitrixService;
    constructor(bitrixService: BitrixService);
    createLead(leadData: {
        title: string;
        name: string;
        phone: string;
        email: string;
        comment?: string;
    }): Promise<{
        leadId: any;
        message: string;
    }>;
}
