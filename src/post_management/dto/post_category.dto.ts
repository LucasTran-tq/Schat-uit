import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class CreatePostCategoryDto {
  @IsEmpty()
  _id?: any;

  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdatePostCategoryDto {
  id: any;

  @ApiProperty()
  @IsString()
  name: string;
}
