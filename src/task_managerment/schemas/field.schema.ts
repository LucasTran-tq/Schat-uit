import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type FieldDocument = Field & mongoose.Document;

@Schema()
export class Field {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.ObjectId;

  @Prop()
  field_name: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
