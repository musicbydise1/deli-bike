import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';

@Entity('maintenance')
export class Maintenance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Bike, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bikeId' })
    bike: Bike;

    @Column({ name: 'service_date', type: 'timestamp' }) // Исправление названия колонки
    serviceDate: Date;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: ['scheduled', 'in_progress', 'completed'],
        default: 'scheduled',
    })
    status: 'scheduled' | 'in_progress' | 'completed';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}