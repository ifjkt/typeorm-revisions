import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class TestEntitySoft extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  test!: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
