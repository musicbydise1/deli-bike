"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const env_helper_1 = require("../../common/helper/env.helper");
const envFilePath = (0, env_helper_1.getEnvPath)((0, path_1.resolve)(__dirname, '../..', 'common/envs'));
(0, dotenv_1.config)({ path: envFilePath });
exports.dataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: 'ecommercedb',
    username: 'postgres',
    password: 'password',
    entities: [process.env.DATABASE_ENTITIES],
    migrations: ['dist/src/database/migration/history/*.js'],
    logger: 'simple-console',
    synchronize: false,
    logging: true,
};
//# sourceMappingURL=typeOrm.config.js.map