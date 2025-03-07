"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitrixService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let BitrixService = class BitrixService {
    constructor(configService) {
        this.configService = configService;
        this.webhookUrl = 'https://mdline.bitrix24.kz/rest/9/7c7xusn6aab7mls9/';
    }
    async createLead(leadData) {
        const url = `${this.webhookUrl}/crm.lead.add.json`;
        const payload = {
            fields: {
                TITLE: leadData.title,
                NAME: leadData.name,
                PHONE: [{ VALUE: leadData.phone, VALUE_TYPE: 'WORK' }],
                EMAIL: [{ VALUE: leadData.email, VALUE_TYPE: 'WORK' }],
                COMMENTS: leadData.comment || '',
            },
            params: { REGISTER_SONET_EVENT: 'Y' },
        };
        try {
            const response = await axios_1.default.post(url, payload);
            if (response.data.result) {
                return response.data.result;
            }
            else {
                throw new common_1.InternalServerErrorException('Ошибка при создании лида в Битрикс24');
            }
        }
        catch (error) {
            console.error('Ошибка при создании лида:', error);
            throw new common_1.InternalServerErrorException('Ошибка интеграции с Битрикс24');
        }
    }
};
BitrixService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BitrixService);
exports.BitrixService = BitrixService;
//# sourceMappingURL=bitrix.service.js.map