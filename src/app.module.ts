import { Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from 'config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        database
      ],
      isGlobal: true,
    }),
    ConditionalModule.registerWhen(TypeOrmModule.forRoot({
      type: database().type,
      host: database().host,
      port: database().port,
      username: database().username,
      password: database().password,
      database: database().database,
      entities: [],
      synchronize: false,
    }), (env: NodeJS.ProcessEnv) => !!env['DATABASE_DB'] && !!env['DATABASE_HOST']),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
