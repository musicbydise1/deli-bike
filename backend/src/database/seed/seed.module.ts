import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '../../config';
import { Role } from '../entities/role.entity';
import { User } from '../../modules/users/entities/user.entity';
import { TypeOrmConfigService } from '../typeorm/typeorm.service';
import { SeedService } from './seed.service';
import { AdminSeeder } from './seeders/admin.seeder';
// import { CurrencySeeder } from './seeders/currency.seeder';
import { RolesSeeder } from './seeders/role.seeder';
import { Currency } from '../../modules/pricing/currency/entities/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([Role, User, Currency]),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [],
  providers: [
    SeedService,
    RolesSeeder,
    AdminSeeder,
    // CurrencySeeder,
  ],
})
export class SeedModule {}
