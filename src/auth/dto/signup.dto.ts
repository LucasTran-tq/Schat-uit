import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

/* Validation SmsRequire */
export class SignupDto {
  @IsEmpty()
  _id?: any;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone_number: string;
}
