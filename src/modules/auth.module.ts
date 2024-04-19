import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database.module';
import { User } from '../entities/user.entity';
import { UserModule } from './user.module';
import { UserService } from '../services/user.service';
import { AuthController } from '../controllers/auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from 'src/strategies/auth.strategy';

@Module({
  imports: [
    DatabaseModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: new ConfigService().get('auth.jwt.secret'),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, ConfigService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule { }
