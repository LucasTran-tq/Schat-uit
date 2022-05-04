import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import {
  CreatePostCategoryDto,
  UpdatePostCategoryDto,
} from '../dto/post_category.dto';
import { PostCategoryRepository } from '../repositories/post_category.repository';
import { PostCategory } from '../schemas/post_category.schema';

@Injectable()
export class PostCategoryService {
  constructor(
    private readonly postCategoryRepository: PostCategoryRepository,
  ) {}

  public async createPostCategory(
    user: User,
    createPostCategoryDto: CreatePostCategoryDto,
  ): Promise<PostCategory> {
    try {
      return await this.postCategoryRepository.create({
        created_by: user,
        ...createPostCategoryDto,
      });
    } catch (err) {
      return err;
    }
  }

  public async getAllPostCategory(): Promise<PostCategory[]> {
    return await this.postCategoryRepository.getAll();
  }

  public async getPostCategory(name: string): Promise<PostCategory[]> {
    return await this.postCategoryRepository.find({ name });
  }

  public async getPostCategoryById(id: string): Promise<PostCategory> {
    return await this.postCategoryRepository.getById(id);
  }

  public async updatePostCategoryById(
    id: string,
    updatePostCategoryDto: UpdatePostCategoryDto,
  ): Promise<PostCategory> {
    return await this.postCategoryRepository.updateById(
      id,
      updatePostCategoryDto,
    );
  }

  public async deletePostCategoryById(id: string): Promise<PostCategory> {
    return await this.postCategoryRepository.deleteById(id);
  }
}
