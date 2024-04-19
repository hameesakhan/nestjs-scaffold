
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [DatabaseModule.forFeature([User])],
    providers: [UserService, { provide: APP_GUARD, useClass: AuthGuard }],
    controllers: [UserController],
})
export class UserModule { }
