import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import * as mongoose from "mongoose";
import { Field } from "./field.schema";

export type TaskCategoryDocument = TaskCategory & mongoose.Document;
@Schema()
export class TaskCategory {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop()
    task_category_name: string;

    @Prop({type: mongoose.Types.ObjectId, ref: Field.name})
    @Type(() => Field)
    field: Field;
    
}

export const TaskCategorySchema = SchemaFactory.createForClass(TaskCategory);