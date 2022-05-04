import { Injectable } from '@nestjs/common';
import { CreateTaskCategoryDto, UpdateTaskCategoryDto } from '../dto/task_category.dto';
import { FieldRepository } from '../repositories/field.repository';
import { TaskCategoryRepository } from '../repositories/task_category.repository';
import { TaskCategory } from '../schemas/task_category.schema';
@Injectable()
export class TaskCategoryService {
    constructor(
        private readonly taskCategoryRepository: TaskCategoryRepository,
        private readonly fieldRepository: FieldRepository) { }

    public async newTaskCategory(createTaskCategoryDto: CreateTaskCategoryDto): Promise<TaskCategory> {
        const {field_id, ...taksCategory} = createTaskCategoryDto;
        const field = await this.fieldRepository.getOne({_id: field_id});
        return this.taskCategoryRepository.create({field: field, ...taksCategory});
    }

    public async getAllTaskCategoryByField(fieldId: string): Promise<any>{
        // return this.taskCategoryRepository.getAll({});
    }

    public async getTaskCategoryById(taskCategoryId: string): Promise<TaskCategory>{
        return await this.taskCategoryRepository.getOne({_id: taskCategoryId});
    }

    public async updateTaskCategory(taskCategoryId: string, updateTaskCategoryDto: UpdateTaskCategoryDto): Promise<TaskCategory>{
        return await this.taskCategoryRepository.update(taskCategoryId, updateTaskCategoryDto);
    }

    public async deleteTaskCategoryById(taskCategoryId: string): Promise<TaskCategory>{
        return this.taskCategoryRepository.delete(taskCategoryId);
    }

}