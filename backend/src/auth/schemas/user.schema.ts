import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;
@Schema({timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class User {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;
  @Prop()
  user_name: string;
  @Prop()
  phone_number: string;
  @Prop()
  avatar?: string;
  
  @Prop()
  disconnected_time?: Date;

  @Prop({type: Date, default: Date.now})
  created_at?: Date;

  @Prop({type: Date, default: Date.now})
  updated_at?: Date;
}

export const UserSChema = SchemaFactory.createForClass(User);
