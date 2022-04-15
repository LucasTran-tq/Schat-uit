import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;
@Schema()
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
}

export const UserSChema = SchemaFactory.createForClass(User);
