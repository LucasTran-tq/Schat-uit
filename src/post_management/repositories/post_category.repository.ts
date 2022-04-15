import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  PostCategory,
  PostCategoryDocument,
} from '../schemas/post_category.schema';
@Injectable()
export class PostCategoryRepository {
  constructor(
    @InjectModel(PostCategory.name)
    private postCategoryModel: Model<PostCategoryDocument>,
  ) {}

  public async create(postCategory: PostCategory): Promise<PostCategory> {
    const newPostCategory = new this.postCategoryModel(postCategory);
    return await newPostCategory.save();
  }

  public async getAll(): Promise<PostCategory[]> {
    return await this.postCategoryModel.find();
  }

  public async find(
    postCategoryFilterQuery: FilterQuery<PostCategory>,
  ): Promise<PostCategory[]> {
    return await this.postCategoryModel.find(postCategoryFilterQuery);
  }

  public async getOne(
    postCategoryFilterQuery: FilterQuery<PostCategory>,
  ): Promise<PostCategory> {
    return await this.postCategoryModel.findOne(postCategoryFilterQuery);
  }

  public async getById(postCategoryID: string): Promise<PostCategory> {
    return await this.postCategoryModel.findById(postCategoryID);
  }

  public async updateById(
    postCategoryID: string,
    postCategoryFilterQuery: Partial<PostCategory>,
  ): Promise<PostCategory> {
    return await this.postCategoryModel.findByIdAndUpdate(
      postCategoryID,
      postCategoryFilterQuery,
    );
  }

  public async deleteById(organizationID: string): Promise<PostCategory> {
    return await this.postCategoryModel.findByIdAndRemove(organizationID);
  }
}
