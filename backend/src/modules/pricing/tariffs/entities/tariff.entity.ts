import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Bike } from '../../../bikes/entities/bike.entity';

@Entity('tariffs')
export class Tariff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bikeId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int', comment: 'Продолжительность тарифа в днях' })
    duration: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Bike, bike => bike.tariffs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bikeId' })
    bike: Bike;
}