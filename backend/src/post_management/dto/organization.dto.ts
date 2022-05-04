import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsEmpty()
  orgId?: any;

  @ApiProperty()
  @IsString()
  name: string;

  //   @IsArray()
  participants?: ParticipantsDto[];
}

export class UpdateOrganizationDto {
  @IsEmpty()
  orgId?: any;

  @ApiProperty()
  @IsString()
  name?: string;

  @IsArray()
  participants?: ParticipantsDto[];
}

export class ParticipantsDto {
  user_id: string;
  role: string;
}
