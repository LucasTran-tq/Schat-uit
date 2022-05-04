import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskCategoryDto, UpdateTaskCategoryDto} from './dto/task_category.dto';
import { TaskCategory } from './schemas/task_category.schema';
import { TaskCategoryService } from './services/task_category.service';

@Controller('task-category')
export class TaskCategoryController {
    constructor(private readonly taskCategoryService: TaskCategoryService){}

    @Post('/create')
    public async newTaskCategory(@Body() taskCategoryDto: CreateTaskCategoryDto ): Promise<TaskCategory>{
        return await this.taskCategoryService.newTaskCategory(taskCategoryDto);
    }

    @Get('/find-all-by-field')
    public async getAllTaskCategoryByField(field: string): Promise<TaskCategory>{
        return await this.taskCategoryService.getAllTaskCategoryByField(field);
    }

    @Get('/find-by-id')
    public async getTaskCategoryById(@Query('id') taskCategoryId: string): Promise<TaskCategory>{
        return await this.taskCategoryService.getTaskCategoryById(taskCategoryId);
    }

    @Patch('/update')
    public async updateTaskCategory(taskCategoryId: string,updateTaskCategoryDto: UpdateTaskCategoryDto): Promise<TaskCategory>{
        return await this.taskCategoryService.updateTaskCategory(taskCategoryId,updateTaskCategoryDto);
    }

    @Delete('/delete')
    public async deleteTaskCategoryById(@Query('id') taskCategoryId: string): Promise<TaskCategory>{
        return await this.taskCategoryService.deleteTaskCategoryById(taskCategoryId);
    }

}