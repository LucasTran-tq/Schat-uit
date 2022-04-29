import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PaginateChatRoomDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    chat_room_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    page: number;
}