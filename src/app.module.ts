import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'
import { User } from './entities/user.entity';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "1313",
    "database": "nestjs",
    "entities": [User],
    "synchronize": true
  }), UsersModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
