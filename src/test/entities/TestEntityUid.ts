import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
export class TestEntityUid extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  test!: string;
}
