import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('bike')
export class Bike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    model: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'price_per_hour', type: 'decimal', precision: 10, scale: 2 })
    pricePerHour: number;

    @Column({ name: 'price_per_day', type: 'decimal', precision: 10, scale: 2 })
    pricePerDay: number;

    @Column({
        name: 'availability_status',
        type: 'enum',
        enum: ['available', 'unavailable'],
        default: 'available',
    })
    availability_status: 'available' | 'unavailable';

    @Column({ name: 'image_urls', type: 'text', array: true, default: '{}' })
    imageUrls: string[];

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;
}