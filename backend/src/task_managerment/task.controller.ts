import { Body, Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Request } from 'express';
import { Task } from './schemas/task.schema';
import { TaskService } from './services/task.service';

@Controller('/task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post('/create')
    public async createTask(@Body() taskDto: TaskDto): Promise<any> {
        return {
            emit: 'addTask',
            on: 'onGetTaskById',
            url: 'http://localhost:5000/action'
        }
    }

    @Get('/all')
    public async getAllTask(@Query('user-id') userId: string): Promise<any>{
        return {
            emit: 'getAllTask',
            on: 'onGetAllTask',
            url: 'http://localhost:5000/action'
        }
    }
    @Get()
    public async getTaskById(@Query('id') taskId: string): Promise<any>{
        return {
            emit: 'getTaskById',
            on: 'onGetTaskById',
            url: 'http://localhost:5000/action'
        }
    }

    @Delete()
    public async deleteTaskById(@Query('id') taskId: string): Promise<any>{
        return {
            emit: 'deleteTask',
            on: 'onGetAllTask',
            url: 'http://localhost:5000/action'
        }
    }
    


}