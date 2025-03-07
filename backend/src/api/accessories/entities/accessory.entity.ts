import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';

@Entity('accessories')
export class Accessory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bikeId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Bike, (bike) => bike.accessories, { nullable: false })
    @JoinColumn({ name: 'bikeId' })
    bike: Bike;
}