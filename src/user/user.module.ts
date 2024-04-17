
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [DatabaseModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule { }
