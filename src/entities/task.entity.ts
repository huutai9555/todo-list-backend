import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taskname: string;

    @Column()
    isDone: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User
}
