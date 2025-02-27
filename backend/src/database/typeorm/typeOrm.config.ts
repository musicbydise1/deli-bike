import { config } from 'dotenv';
import { resolve } from 'path';
import { getEnvPath } from '../../common/helper/env.helper';
import { DataSourceOptions } from 'typeorm';

const envFilePath: string = getEnvPath(
  resolve(__dirname, '../..', 'common/envs'),
);
config({ path: envFilePath });
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  database: 'ecommercedb',
  username: 'postgres',
  password: 'password',
  entities: [process.env.DATABASE_ENTITIES],
  migrations: ['dist/src/database/migration/history/*.js'],
  logger: 'simple-console',
  synchronize: false, // never use TRUE in production!
  logging: true, // for debugging in dev Area only
};
