import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import * as mongoose from "mongoose";
import { Field } from "./field.schema";

export type TaskCategoryDocument = TaskCategory & mongoose.Document;
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class TaskCategory {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop()
    task_category_name: string;

    @Prop({type: mongoose.Types.ObjectId, ref: Field.name})
    @Type(() => Field)
    field: Field;

    @Prop({ type: Date, default: Date.now })
    created_at?: Date;

    @Prop({ type: Date, default: Date.now })
    updated_at?: Date;
    
}

export const TaskCategorySchema = SchemaFactory.createForClass(TaskCategory);