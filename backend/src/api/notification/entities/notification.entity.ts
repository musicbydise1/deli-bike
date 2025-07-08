import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../modules/users/entities/user.entity';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 50 })
  type: string; // Тип уведомления (e.g., "payment", "rental")

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string; // Статус уведомления (e.g., "sent", "failed")

  @Column({ type: 'text' })
  message: string; // Сообщение уведомления

  @CreateDateColumn()
  createdAt: Date;
}
