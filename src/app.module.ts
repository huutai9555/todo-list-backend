import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [UsersModule, AuthModule, TasksModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'todo-list-v2',
    entities: [User, Task],
    synchronize: true,
  }),],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],
})
export class AppModule { }
