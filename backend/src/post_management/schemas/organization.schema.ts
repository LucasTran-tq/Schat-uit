import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type OrganizationDocument = Organization & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Organization {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.ObjectId;

  @Prop()
  name: string;

  @Prop()
  participants: ParticipantOrganization[];
}

export class ParticipantOrganization {
  user: User;
  role: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
