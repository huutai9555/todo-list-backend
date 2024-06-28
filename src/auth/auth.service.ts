import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { SignInUserDto } from 'src/dtos/signin-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userServices: UsersService) { }

    signIn(signInUserDto: SignInUserDto) {
        return this.userServices.signIn(signInUserDto);
    }

    register(registerUserDto: RegisterUserDto) {
        return this.userServices.register(registerUserDto)
    }

    getProfile(username: string) {
        return this.userServices.getProfile(username)
    }
}
