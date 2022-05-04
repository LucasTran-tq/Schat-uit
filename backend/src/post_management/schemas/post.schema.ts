import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Organization } from './organization.schema';
import { PostCategory } from './post_category.schema';

export type PostDocument = Post & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Post {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  created_by: User;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: PostCategory.name,
  })
  @Type(() => PostCategory)
  post_category: PostCategory;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Organization.name,
  })
  @Type(() => Organization)
  organization: Organization;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  attachment?: Attachment[];
}

export class Attachment {
  file_type: string;
  file_path: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
