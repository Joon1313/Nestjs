import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Board } from '../../board/entities/board.entity';

@Entity()
@Unique(['user_id'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  age: number;

  // eslint-disable-next-line prettier/prettier
  @OneToMany(type => Board, (board) => board.user, { eager: false })
  boards: Board[];
}
