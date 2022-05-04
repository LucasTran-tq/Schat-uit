import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  public async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    return await newPost.save();
  }

  public async getAll(): Promise<Post[]> {
    return await this.postModel
      .find()
      .populate(['created_by', 'post_category', 'organization']);
  }

  public async find(postFilterQuery: FilterQuery<Post>): Promise<Post[]> {
    return await this.postModel
      .find(postFilterQuery)
      .populate(['created_by', 'post_category', 'organization']);
  }

  public async getOne(postFilterQuery: FilterQuery<Post>): Promise<Post> {
    return await this.postModel
      .findOne(postFilterQuery)
      .populate(['created_by', 'post_category', 'organization']);
  }

  public async getById(postID: string): Promise<Post> {
    return await this.postModel
      .findById(postID)
      .populate(['created_by', 'post_category', 'organization']);
  }

  public async updateById(
    postID: string,
    postFilterQuery: Partial<Post>,
  ): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(postID, postFilterQuery);
  }

  public async deleteById(postID: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(postID);
  }

  public async search(postFilterQuery: FilterQuery<Post>): Promise<Post[]> {
    return await this.postModel
      .find(postFilterQuery)
      .populate(['created_by', 'post_category', 'organization']);
  }
}
