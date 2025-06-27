import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("vacancies")
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  salary: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
