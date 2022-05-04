import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { TaskCategory } from './task_category.schema';

export class TaskParticipant {
  user: User;
  role: string;
}
export class Item {
  index: number;
  item_name: string;
  files: string[];
  task_participants?: TaskParticipant[];
}
export class CheckList {
  index: number;
  check_list_name: string;
  items?: Item[];
  check_important_task: boolean;
}

export type TaskDocument = Task & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Task {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: TaskCategory.name,
  })
  @Type(() => TaskCategory)
  task_category: TaskCategory;

  @Prop({ required: true, index: true })
  task_name: string;

  @Prop({ required: true })
  check_list: CheckList[];

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  @Prop()
  observer: User[];

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  @Prop({})
  participants: User[];

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  owner: User;

  @Prop({ required: true })
  status: string;

  @Prop()
  description?: string;

  @Prop()
  files: string[];

  @Prop({ required: true })
  progress: number;

  @Prop()
  deadline: Date;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  @Type(() => User)
  created_by: User;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
