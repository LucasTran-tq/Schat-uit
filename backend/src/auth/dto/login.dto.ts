import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

export class LoginDto {
  @IsEmpty()
  _id: any;

  @ApiProperty()
  @IsString()
  phone_number: string;
}
