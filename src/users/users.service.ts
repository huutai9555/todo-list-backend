import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from 'src/auth/constant';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { SignInUserDto } from 'src/dtos/signin-user.dto';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>, @InjectRepository(Task)
        private tasksRepository: Repository<Task>, private jwtService: JwtService) { }

    async signIn(signInUserDto: SignInUserDto) {
        const user = await this.usersRepository.createQueryBuilder("user").where("user.username = :username", { username: signInUserDto.username }).getOne()
        if (!user) {
            throw new BadRequestException("This user does not exist!!")
        }
        if (user.password !== signInUserDto.password) {
            throw new BadRequestException("Check your password and try again!!")
        }
        const payload = { sub: user.id, username: user.username };
        const access_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret
        })
        return {
            username: user.username,
            access_token: access_token
        }
    }

    async register(registerUserDto: RegisterUserDto) {
        const hasUser = await this.usersRepository.createQueryBuilder("user").where("user.username = :username", { username: registerUserDto.username }).getOne();
        if (hasUser) {
            throw new BadRequestException("This username has been taken. please try another")
        }
        await this.usersRepository.createQueryBuilder("user").insert().values([{
            ...registerUserDto
        }]).execute();

        const user = await this.usersRepository.createQueryBuilder("user").where("user.username = :username", { username: registerUserDto.username }).getOne();

        const payload = { sub: user.id, username: user.username };
        const access_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret
        })
        return {
            ...user,
            access_token: access_token
        }
    }

    async getProfile(username: string): Promise<any> {
        const profile = await this.usersRepository.createQueryBuilder("user").leftJoinAndSelect("user.tasks", "task").where('user.username = :username', { username }).getOne();
        return profile
    }
}
