import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsEmpty()
  postId?: any;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  created_by_id: string;

  @ApiProperty()
  @IsString()
  post_category_id: string;

  @ApiProperty()
  @IsString()
  organization_id: string;
}

export class UpdatePostDto {
  @IsEmpty()
  postId?: any;

  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsString()
  attachment?: AttachmentDto[];

  @ApiProperty()
  @IsString()
  created_by_id?: string;

  @ApiProperty()
  @IsString()
  post_category_id?: string;

  @ApiProperty()
  @IsString()
  organization_id?: string;
}

export class SearchPostDto {
  @IsEmpty()
  postId?: any;

  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsString()
  created_by_id?: string;

  @ApiProperty()
  @IsString()
  post_category_id?: string;

  @ApiProperty()
  @IsString()
  organization_id?: string;

  // time
}

export class AttachmentDto {
  file_type: string;
  file_path: string;
}

// export enum RoleInPostManagement {
//   admin = 'admin',
//   member = 'member',
// }
