import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsObject, IsString } from "class-validator";
import { ChatMessageDto } from "./chat_message.dto";

export class ChatWithAnotherUserDto{
    @ApiProperty()
    @IsString()
    another_user_id: string;

    @ApiProperty()
    @IsObject()
    chat_message: ChatMessageDto;
}