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
import { Rental } from '../../rental/entities/rental.entity';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Rental, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rentalId' })
    rental: Rental;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ name: 'payment_method', type: 'varchar', length: 50 })
    paymentMethod: string;

    @Column({
        type: 'enum',
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    })
    status: 'pending' | 'completed' | 'failed';

    @Column({ name: 'transaction_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    transactionDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}