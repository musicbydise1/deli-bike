import { config } from 'dotenv';
import { resolve } from 'path';
import { getEnvPath } from '../../common/helper/env.helper';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { configuration } from '../../config';

const envFilePath: string = getEnvPath(
  resolve(__dirname, '../..', 'common/envs'),
);
config({ path: envFilePath });

export const createDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port'),
  database: configService.get<string>('database.name'),
  username: configService.get<string>('database.user'),
  password: configService.get<string>('database.password'),
  entities: [configService.get<string>('database.entities')],
  migrations: ['dist/database/migration/history/*.js'],
  logger: 'simple-console',
  synchronize: false, // never use TRUE in production!
  logging: true, // for debugging in dev Area only
});

const configService = new ConfigService(configuration());
export const dataSourceOptions = createDataSourceOptions(configService);
