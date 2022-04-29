import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import * as mongoose from 'mongoose';

export type FieldDocument = Field & mongoose.Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Field {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.ObjectId;

  @Prop()
  field_name: string;

  @Prop({ type: Date, default: Date.now })
  created_at?: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at?: Date;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
