import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'
import { User } from './entities/user.entity';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "1313",
    "database": "Nestjs",
    "entities": [User],
    "synchronize": true
  }), UsersModule, AuthModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
