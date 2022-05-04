/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import mongoose from 'mongoose';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { CreateOrganizationDto } from '../dto/organization.dto';
import { CreatePostDto, SearchPostDto, UpdatePostDto } from '../dto/post.dto';
import { OrganizationRepository } from '../repositories/organization.repository';
import { PostRepository } from '../repositories/post.repository';
import { PostCategoryRepository } from '../repositories/post_category.repository';
import { Organization } from '../schemas/organization.schema';
import { Post } from '../schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly postCategoryRepository: PostCategoryRepository,
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const { created_by_id, post_category_id, organization_id, ...rest } =
        createPostDto;
      const user = await this.userRepository.getUser({
        _id: created_by_id,
      });

      const po_ca = await this.postCategoryRepository.getOne({
        _id: post_category_id,
      });

      const org = await this.organizationRepository.getOne({
        _id: organization_id,
      });

      const postObj = {
        ...rest,
        created_by: user,
        post_category: po_ca,
        organization: org,
      };

      return await this.postRepository.create(postObj);
    } catch (err) {
      return err;
    }
  }

  public async getAllPost(): Promise<Post[]> {
    return await this.postRepository.getAll();
  }

  public async getAllPostByUser(user_id: string): Promise<Post[]> {
    // user -> org -> post

    const objId = new mongoose.Types.ObjectId(user_id);

    const org = await this.organizationRepository.findUserInOrganization({
      'participants.user._id': objId,
    });

    const obj = new mongoose.Types.ObjectId(org._id.toString());

    return await this.postRepository.find({
      organization: obj,
    });
  }

  public async getPost(name: string): Promise<Post[]> {
    return await this.postRepository.find({ name });
  }

  public async getPostById(id: string): Promise<Post> {
    return await this.postRepository.getById(id);
  }

  public async updatePostById(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    try {
      return await this.postRepository.updateById(id, updatePostDto);
    } catch (error) {
      return error;
    }
  }

  public async deletePostById(id: string): Promise<Post> {
    return await this.postRepository.deleteById(id);
  }

  public async searchPost(searchPostDto: SearchPostDto): Promise<Post[]> {
    const searchObj = this.makeNewSearchObject(searchPostDto);

    return await this.postRepository.search(searchObj);
  }

  makeNewSearchObject(searchPostDto: SearchPostDto) {
    // title, created_by, post-cate

    let obj = {};
    Object.keys(searchPostDto).forEach(function (key) {
      let newKey = key;
      if (newKey === 'title') {
        obj[newKey] = { $regex: `.*${searchPostDto[key]}.*`, $options: 'i' };
      } else {
        if (newKey === 'created_by_id') {
          newKey = 'created_by';
        } else if (newKey === 'post_category_id') {
          newKey = 'post_category';
        } else if (newKey === 'organization_id') {
          newKey = 'organization';
        }

        const objId = new mongoose.Types.ObjectId(searchPostDto[key]);

        obj[newKey] = objId;
      }
    });

    return obj;
  }
}
