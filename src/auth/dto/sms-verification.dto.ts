import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

/* Validation smsVerification */
export class SmsVerificationDto {
  @IsEmpty()
  _id?: any;

  @ApiProperty()
  @IsString()
  phone_number: string;

  @ApiProperty()
  @IsNumber()
  otp: number;
}
