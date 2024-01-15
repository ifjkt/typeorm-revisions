import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
export class TestEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  test!: string;
}
