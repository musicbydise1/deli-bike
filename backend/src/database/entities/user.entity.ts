import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 255 })
  public firstName: string;

  @Column({ type: 'varchar', length: 255 })
  public lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public patronymic?: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  public email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public phoneNumber?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public companyName?: string;

  @Column({ type: 'varchar', length: 12, unique: true, nullable: true })
  public iin?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public idCardNumber?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public idCardFrontImage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public idCardBackImage?: string;

  @Column({ type: 'boolean', default: false })
  public isVerified: boolean;

  @Column({ type: 'varchar', length: 6, nullable: true })
  public verificationCode?: string;

  @Column({ type: 'boolean', default: false })
  public mfaEnabled: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public mfaSecret?: string;

  @Column({ type: 'enum', enum: ['active', 'suspended', 'deleted'], default: 'active' })
  public status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public profileImage?: string;

  @Column({ type: 'text', nullable: true })
  public address?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public paymentMethod?: string;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed'], nullable: true })
  public paymentStatus?: string;

  @Column({ type: 'json', nullable: true })
  public rentalHistory?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  public walletBalance: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public subscriptionType?: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  public preferredCurrency: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable({ name: 'user_roles' })
  public roles: Role[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
