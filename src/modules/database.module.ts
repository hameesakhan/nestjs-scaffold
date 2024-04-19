import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({})
export class DatabaseModule extends TypeOrmModule { }
