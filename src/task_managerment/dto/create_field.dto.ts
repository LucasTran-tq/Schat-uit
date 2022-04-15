import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateFieldDto {
  @IsEmpty()
  _id?: any;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  field_name: string;
}
