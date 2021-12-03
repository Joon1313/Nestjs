import { Board } from 'src/board/entities/board.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @OneToMany(type => Board, (board) => board.user, { eager: false })
  boards: Board[];
}
