import {
    ForbiddenException,
    Injectable
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync, timingSafeEqual } from 'crypto';
import { UserService } from './user.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signUp(dto: RegisterDto) {
        try {
            const user = await this.userService.create({
                name: dto.name,
                email: dto.email,
                password: dto.password,
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            throw error;
        }
    }

    async signIn(dto: LoginDto): Promise<{ access_token: string }> {
        // find the user by email
        const user = await this.userService.usersRepository.findOneBy({ email: dto.email });
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }

        const [salt, passwordHash] = user.password.split(':');

        if (!timingSafeEqual(Buffer.from(passwordHash, 'hex'), pbkdf2Sync(dto.password, salt, 10000, 64, 'sha512'))) {
            throw new ForbiddenException('Invalid credentials');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('auth.jwt.secret');

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            },
        );

        return {
            access_token: token,
        };
    }
}