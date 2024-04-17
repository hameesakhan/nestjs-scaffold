import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from 'config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        database
      ],
      isGlobal: true,
      expandVariables: true,
    }),
    DatabaseModule.forRoot({
      type: database().type,
      host: database().host,
      port: database().port,
      username: database().username,
      password: database().password,
      database: database().database,
      entities: [User],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
