import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Task } from 'src/entities/task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Task])],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule { }
