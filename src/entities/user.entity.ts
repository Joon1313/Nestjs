import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  user_id: string;

  @Column()
  @IsNotEmpty()
  age: number;

  @Column()
  @IsNotEmpty()
  status:boolean;

  @Column()
  @IsNotEmpty()
  created: Date;
}