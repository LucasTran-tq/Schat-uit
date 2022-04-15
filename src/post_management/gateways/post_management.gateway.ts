import { Injectable, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AppGateway } from 'src/gateways/app.gateway';
import { Roles } from '../decorators/roles.decorator';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '../dto/organization.dto';
import { CreatePostDto, SearchPostDto, UpdatePostDto } from '../dto/post.dto';
import {
  CreatePostCategoryDto,
  UpdatePostCategoryDto,
} from '../dto/post_category.dto';
import { OrgRole } from '../enums/organization_role.enum';
import { OrgRolesGuard } from '../guards/organization_roles.guard';

@Injectable()
@UseGuards(OrgRolesGuard)
@WebSocketGateway(5000, { namespace: 'post-management' })
export class PostManagementGateway
  extends AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleConnection(client: any, ...args: any[]) {
    try {
      console.log('On connection');
    } catch (err) {
      return this.server.to(client.id).emit('error', err);
    }
  }

  handleDisconnect(client: any) {
    try {
      console.log('On disconnection');
    } catch (err) {
      return this.server.to(client.id).emit('error', err);
    }
  }

  //**
  //   ** POST CATEGORY **
  //**
  // @Roles(OrgRole.Admin)
  @SubscribeMessage('addPostCategory')
  public async handleAddPostCategory(
    client: Socket,
    createPostCategoryDto: CreatePostCategoryDto,
  ) {
    try {
      const user = await this.getUserClient(client);

      const newPostCategory =
        await this.getPostCategoryService.createPostCategory(
          user,
          createPostCategoryDto,
        );

      if (newPostCategory) {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', newPostCategory);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', 'Can not create post category');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  @SubscribeMessage('updatePostCategory')
  public async handleUpdatePostCategory(
    client: Socket,
    updatePostCategoryDto: UpdatePostCategoryDto,
  ) {
    try {
      const postCategoryObj =
        await this.getPostCategoryService.updatePostCategoryById(
          updatePostCategoryDto.id,
          updatePostCategoryDto,
        );
      if (postCategoryObj) {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', postCategoryObj);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', 'Can not find the post category');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  @SubscribeMessage('deletePostCategory')
  public async handleDeletePostCategory(client: Socket, id: any) {
    const postCategoryId = id.id;
    try {
      const postCategoryObj =
        await this.getPostCategoryService.deletePostCategoryById(
          postCategoryId,
        );
      if (postCategoryObj) {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', postCategoryObj);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', 'Can not find the post category');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  @SubscribeMessage('getPostCategoryList')
  public async getPostCategoryList(client: Socket) {
    try {
      const postCategoryObj =
        await this.getPostCategoryService.getAllPostCategory();

      if (postCategoryObj) {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', postCategoryObj);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePostCategory', 'Can not find the post category');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  //**
  //   ** ORGANIZATION **
  //**

  // * CREATE
  @SubscribeMessage('addOrganization')
  public async handleAddOrganization(
    client: Socket,
    createOrganizationDto: CreateOrganizationDto,
  ) {
    try {
      // * condition: 1 user is only in 1 organization.
      // * 1. admin is in another Org -> false
      // * 2. admin is not in another Org ->
      // * 2.1 participants is not in another Org -> add suitable participants,
      // * 2.2 participants is in another Org -> do not add participants
      // * 3. create Org with participants
      // * DONE

      const owner = await this.getUserClient(client);

      const newOrganization =
        await this.getOrganizationService.createOrganization(
          owner,
          createOrganizationDto,
        );

      if (newOrganization) {
        return this.server
          .to(client.id)
          .emit('responseOrganization', newOrganization);
      } else {
        return this.server
          .to(client.id)
          .emit('responseOrganization', 'Remove user unsuccessfully!');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  // * READ
  @SubscribeMessage('getOrganizationByUser')
  public async handleGetOrganizationByUser(client: Socket) {
    try {
      const user = await this.getUserClient(client);

      const organization =
        await this.getOrganizationService.getOrganizationByUser(
          user._id.toString(),
        );

      if (organization) {
        return this.server
          .to(client.id)
          .emit('responseOrganization', organization);
      } else {
        return this.server
          .to(client.id)
          .emit('responseOrganization', 'Can not get organization');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  // * UPDATE
  @Roles(OrgRole.Admin)
  @SubscribeMessage('addUserToOrg')
  public async handleAddUserToOrg(
    client: Socket,
    updateOrganizationDto: UpdateOrganizationDto,
  ) {
    try {
      const { orgId, ...rest } = updateOrganizationDto;

      const organization =
        await this.getOrganizationService.addUserToOrganization(orgId, rest);

      if (organization) {
        return this.server
          .to(client.id)
          .emit('responseOrganization', organization);
      } else {
        return this.server
          .to(client.id)
          .emit('responseOrganization', 'Can not add user !');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  @Roles(OrgRole.Admin)
  @SubscribeMessage('updateUserRoleInOrg')
  public async handleUpdateUserRoleInOrg(
    client: Socket,
    updateOrganizationDto: UpdateOrganizationDto,
  ) {
    try {
      const { orgId, ...rest } = updateOrganizationDto;

      const organization =
        await this.getOrganizationService.updateUserRoleInOrg(orgId, rest);

      if (organization) {
        return this.server
          .to(client.id)
          .emit('responseOrganization', organization);
      } else {
        return this.server
          .to(client.id)
          .emit('responseOrganization', 'Can not update user role!');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  @Roles(OrgRole.Admin)
  @SubscribeMessage('removeUserFromOrg')
  public async handleRemoveUserFromOrg(
    client: Socket,
    updateOrganizationDto: UpdateOrganizationDto,
  ) {
    try {
      const { orgId, ...rest } = updateOrganizationDto;

      const organization =
        await this.getOrganizationService.removeUserFromOrganization(
          orgId,
          rest,
        );

      if (organization) {
        return this.server
          .to(client.id)
          .emit('responseOrganization', organization);
      } else {
        return this.server
          .to(client.id)
          .emit('responseOrganization', 'Can not remove user !');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  // * DELETE

  //**
  //   ** POST **
  //**

  // * CREATE
  @Roles(OrgRole.Admin)
  @SubscribeMessage('addPost')
  public async handleAddPost(client: Socket, createPostDto: CreatePostDto) {
    try {
      const user = await this.getUserClient(client);

      createPostDto.created_by_id = user._id.toString();

      const newPost = await this.getPostService.createPost(createPostDto);

      if (newPost) {
        return this.server.to(client.id).emit('responsePost', newPost);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePost', 'Can not create new post');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  // * READ
  @Roles(OrgRole.Admin, OrgRole.Member)
  @SubscribeMessage('getPostList')
  public async handleGetPostList(client: Socket) {
    try {
      const user = await this.getUserClient(client);

      // post based on user
      const postList = await this.getPostService.getAllPostByUser(
        user._id.toString(),
      );

      if (postList) {
        return this.server.to(client.id).emit('responsePost', postList);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePost', 'Can not get post list');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  @Roles(OrgRole.Admin, OrgRole.Member)
  @SubscribeMessage('getDetailPost')
  public async handleGetDetailPost(client: Socket, postObj: any) {
    try {
      const { postId } = postObj;

      // post based on user
      const post = await this.getPostService.getPostById(postId);

      if (post) {
        return this.server.to(client.id).emit('responsePost', post);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePost', 'Can not get detail post');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  // * UPDATE
  @Roles(OrgRole.Admin)
  @SubscribeMessage('updatePost')
  public async handleUpdatePost(client: Socket, updatePostDto: UpdatePostDto) {
    try {
      const { postId, ...rest } = updatePostDto;
      const postObj = await this.getPostService.updatePostById(postId, rest);

      if (postObj) {
        return this.server.to(client.id).emit('responsePost', postObj);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePost', 'Can not update the post');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  // * DELETE
  @Roles(OrgRole.Admin)
  @SubscribeMessage('deletePost')
  public async handleDeletePost(client: Socket, postObj: any) {
    try {
      const { postId } = postObj;

      const post = await this.getPostService.deletePostById(postId);

      if (post) {
        return this.server.to(client.id).emit('responsePost', post);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePost', 'Can not delete the post');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }

  // * SEARCH
  // search with many field
  @Roles(OrgRole.Admin, OrgRole.Member)
  @SubscribeMessage('searchPost')
  public async handleSearchPost(client: Socket, searchPostDto: SearchPostDto) {
    try {
      const user = await this.getUserClient(client);
      const org = await this.getOrganizationService.getOrganizationByUser(
        user._id.toString(),
      );

      searchPostDto.organization_id = org._id.toString();

      const post = await this.getPostService.searchPost(searchPostDto);

      if (post) {
        return this.server.to(client.id).emit('responsePost', post);
      } else {
        return this.server
          .to(client.id)
          .emit('responsePost', 'Can not delete the post');
      }
    } catch (error) {
      return this.server.to(client.id).emit('error', error);
    }
  }
}

//**
//   ** Socket **
//**

// -> error

// ? PostCategory
// addPostCategory -> responsePostCategory
// updatePostCategory
// getPostCategoryList
// deletePostCategory

// ? Org
// addOrganization -> responseOrganization
// getOrganizationByUser
// addUserToOrg
// updateUserRoleInOrg
// removeUserFromOrg

// ? Post
// addPost -> responsePost
// getPostList
// getDetailPost
// updatePost
// deletePost
// searchPost
