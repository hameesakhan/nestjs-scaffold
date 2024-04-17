import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from 'config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        database
      ],
      isGlobal: true,
      expandVariables: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
