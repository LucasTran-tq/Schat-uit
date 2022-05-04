import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class SendCSRDto {
  //   @ApiProperty()
  @IsString()
  csr: string;
}
