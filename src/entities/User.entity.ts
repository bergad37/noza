import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectLiteral,
  Repository
} from 'typeorm';
import { BaseEntity } from './base.entity.ts';

@Entity({ name: 'users' })
export class User extends BaseEntity<User> implements NZ.IBase {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  profileImage!: string;

  @Column()
  phoneNumber!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; // hashed

  @Column({ default: 'user' })
  role!: string;

  @Column({ default: true })
  isActive: boolean = true;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
