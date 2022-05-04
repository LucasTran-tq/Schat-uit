import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type SmsDocument = Sms & Document;
@Schema()
export class Sms {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.ObjectId;
  @Prop()
  phone_number: string;
  @Prop()
  otp: number;
}

export const SmsSChema = SchemaFactory.createForClass(Sms);
