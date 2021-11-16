import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column()
  age: number;

  @Column()
  status:boolean;

  @Column()
  created: Date;
}