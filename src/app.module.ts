import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'


@Module({

})
export class AppModule {
  constructor(private connection: Connection) {}
}
