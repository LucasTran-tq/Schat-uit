import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type PostCategoryDocument = PostCategory & mongoose.Document;

@Schema({
  timestamps: true,
})
export class PostCategory {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.ObjectId;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  created_by?: User;
}

export const PostCategorySchema = SchemaFactory.createForClass(PostCategory);
