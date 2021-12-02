import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, BoardModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
