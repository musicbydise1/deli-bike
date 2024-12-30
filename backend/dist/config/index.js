"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const env_helper_1 = require("../common/helper/env.helper");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const envFilePath = (0, env_helper_1.getEnvPath)((0, path_1.resolve)(__dirname, '..', 'common/envs'));
(0, dotenv_1.config)({ path: envFilePath });
const configuration = () => ({
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
    adminUser: {
        email: process.env.ADMIN_EMAIL || 'admin@admin.com',
        password: process.env.ADMIN_PASSWORD || '12345678',
    },
});
exports.configuration = configuration;
//# sourceMappingURL=index.js.map