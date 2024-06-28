import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    @Post()
    create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(req.user.username, createTaskDto)
    }
}
