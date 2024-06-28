import { IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    taskname: string
}