
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        public usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    create(createUserDto: CreateUserDto) {
        const salt = randomBytes(32).toString('hex');
        createUserDto.password = salt + ':' + pbkdf2Sync(createUserDto.password, salt, 10000, 64, 'sha512').toString('hex')
        const u = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(u);
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        if (updateUserDto?.password?.length) {
            const salt = randomBytes(32).toString('hex');
            updateUserDto.password = salt + ':' + pbkdf2Sync(updateUserDto.password, salt, 10000, 64, 'sha512').toString('hex')
        }

        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
