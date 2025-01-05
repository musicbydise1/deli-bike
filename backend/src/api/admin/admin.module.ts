import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { User } from '../../database/entities/user.entity';
import { Bike } from '../bike/entities/bike.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Bike])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}