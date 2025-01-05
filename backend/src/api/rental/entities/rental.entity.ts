import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Bike } from '../../bike/entities/bike.entity';

@Entity('rental')
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Bike, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bikeId' })
    bike: Bike;

    @Column({ name: 'start_date', type: 'timestamp' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'timestamp' })
    endDate: Date;

    @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @Column({
        type: 'enum',
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
    })
    status: 'active' | 'completed' | 'cancelled';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}