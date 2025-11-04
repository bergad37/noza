/// <reference path="../types/common.d.ts" />

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ObjectLiteral,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn
} from 'typeorm';

export abstract class BaseEntity<T extends ObjectLiteral>
  extends Repository<T>
  implements NZ.IBase
{
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Index()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false
  })
  updatedAt!: Date;
}
