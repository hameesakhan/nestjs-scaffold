import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import auth from 'config/auth.config';
import database from 'config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        database,
        auth,
      ],
      isGlobal: true,
      expandVariables: true,
    }),
    DatabaseModule.forRoot({
      type: database().database.type,
      host: database().database.host,
      port: database().database.port,
      username: database().database.username,
      password: database().database.password,
      database: database().database.name,
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
