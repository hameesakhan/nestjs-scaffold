import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import authConfig from 'config/auth.config';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { User } from 'src/user/user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: authConfig().jwt.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
})
export class AuthModule { }
