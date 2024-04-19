import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import { Public } from 'src/public/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('register')
    signUp(@Body() dto: RegisterDto) {
        return this.authService.signUp(dto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() dto: LoginDto) {
        return this.authService.signIn(dto);
    }
}
