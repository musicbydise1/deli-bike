import { getEnvPath } from '../shared/utils/env.helper';
import { config } from 'dotenv';
import { resolve } from 'path';

const envFilePath: string = getEnvPath(resolve(__dirname, '..', 'shared/envs'));

config({ path: envFilePath });

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME || 'ecommercedb',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    entities: process.env.DATABASE_ENTITIES || 'dist/**/*.entity.{ts,js}',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
  },
  bitrix: {
    webhookUrl: process.env.BITRIX_WEBHOOK_URL || '',
  },
  adminUser: {
    email: process.env.ADMIN_EMAIL || 'admin@admin.com',
    password: process.env.ADMIN_PASSWORD || '12345678',
  },
  logLevels: process.env.LOG_LEVELS || 'log,error,warn',
});
