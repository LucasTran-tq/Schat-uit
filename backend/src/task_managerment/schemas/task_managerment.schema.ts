import { Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';
export type TaskManagermentDocument = Document & TaskManagerment;
Schema()
export class TaskManagerment {


        


}

export const TaskManagermentSchema = SchemaFactory.createForClass(TaskManagerment);