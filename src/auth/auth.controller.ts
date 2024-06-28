import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { Public } from 'src/decorators/roles.decorator';
import { SignInUserDto } from 'src/dtos/signin-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @Public()
    signIn(@Body() signInUserDto: SignInUserDto) {
        return this.authService.signIn(signInUserDto)
    }

    @Post('register')
    @Public()
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto)
    }


    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.getProfile(req.user.username)
    }
}
