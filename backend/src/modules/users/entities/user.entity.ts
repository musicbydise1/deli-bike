import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '@/database/entities/role.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public firstName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public lastName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public patronymic?: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  public email: string;

  @Column({ nullable: true })
  public password?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public phoneNumber?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public companyName?: string;

  // Temporarily commented out to fix seeding issue
  // @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  // company?: Company;

  @Column({
    name: 'telegram_chat_id', // <--- указать, что этот столбец так называется в БД
    type: 'varchar',
    length: 12,
    unique: true,
    nullable: true,
  })
  public telegramChatId?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public idCardNumber?: string;

  @Column({ nullable: true })
  idCardFrontImage?: string;

  @Column({ nullable: true })
  idCardBackImage?: string;

  @Column({ type: 'boolean', default: false })
  public isVerified: boolean;

  @Column({ type: 'varchar', length: 6, nullable: true })
  public verificationCode?: string;

  // enum: 'active' | 'suspended' | 'deleted'
  @Column({
    type: 'enum',
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  })
  public status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public profileImage?: string;

  @Column({ type: 'text', nullable: true })
  public address?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public paymentMethod?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public subscriptionType?: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable({ name: 'user_roles' })
  public roles: Role[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
