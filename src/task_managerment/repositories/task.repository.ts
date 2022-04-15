import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Model, FilterQuery } from 'mongoose'
@Injectable()
export class TaskRepository {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }
    public async create(task: Task): Promise<Task> {

        return await new this.taskModel(task).save();
    }

    public async findAll(taskFilterQuery: FilterQuery<Task>): Promise<Task[]> {
        return await this.taskModel.find(taskFilterQuery).populate(['task_category', 'owner','created_by']);
    }

    public async findOne(taskFilterQuery: FilterQuery<Task>): Promise<Task> {
        return await this.taskModel.findOne(taskFilterQuery).populate(['owner']);
    }

    public async deleteById(taskId: string): Promise<any> {
        return await this.taskModel.findByIdAndDelete(taskId);
    }

}