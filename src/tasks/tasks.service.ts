import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>, @InjectRepository(Task)
        private tasksRepository: Repository<Task>) { }


    async create(username: string, createTaskDto: CreateTaskDto) {
        const user = await this.usersRepository.createQueryBuilder("user").where("user.username = :username", { username }).getOne();
        if (user) {
            await this.tasksRepository.createQueryBuilder("task").insert().values([{
                taskname: createTaskDto.taskname,
                isDone: false,
                user: user
            }]).execute();

            return "Created successfully!"
        }
    }
}
