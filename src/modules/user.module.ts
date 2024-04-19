
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database.module';
import { UserController } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../guards/auth.guard';

@Module({
    imports: [DatabaseModule.forFeature([User])],
    providers: [UserService, { provide: APP_GUARD, useClass: AuthGuard }],
    controllers: [UserController],
})
export class UserModule { }
