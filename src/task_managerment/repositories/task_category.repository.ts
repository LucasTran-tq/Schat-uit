import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskCategory, TaskCategoryDocument } from '../schemas/task_category.schema';
import {Model, FilterQuery} from 'mongoose';

@Injectable()
export class TaskCategoryRepository {
    constructor(@InjectModel(TaskCategory.name) private taskCategoryModel: Model<TaskCategoryDocument>) {}

    public async create(taskCategory: TaskCategory): Promise<TaskCategory> {
        const newTaskCategory = new this.taskCategoryModel(taskCategory);
        return await newTaskCategory.save(); 

    }
 
    public async getAll(taskCategoryFilterQuery: FilterQuery<TaskCategory>): Promise<TaskCategory[]>{
        return await this.taskCategoryModel.find(taskCategoryFilterQuery);
    }

    public async getOne(taskCategoryFilterQuery: FilterQuery<TaskCategory>): Promise<TaskCategory>{
        return await this.taskCategoryModel.findOne(taskCategoryFilterQuery);
    }

    public async update(taskCategoryId: string,taskCategoryFilterQuery: Partial<TaskCategory>): Promise<TaskCategory>{
        return await this.taskCategoryModel.findByIdAndUpdate(taskCategoryId, taskCategoryFilterQuery);
    }

    public async delete(taskCategoryId: string): Promise<TaskCategory>{
        return await this.taskCategoryModel.findByIdAndRemove(taskCategoryId);
    }
    
}