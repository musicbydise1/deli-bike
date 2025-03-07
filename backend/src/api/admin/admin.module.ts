import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { User } from '../../database/entities/user.entity';
import { Bike } from '../bike/entities/bike.entity';
import {Rental} from "../rental/entities/rental.entity";
import {RoleModule} from "../role/role.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Bike, Rental]),
        RoleModule,
    ],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}