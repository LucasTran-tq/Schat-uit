import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmpty, IsNotEmpty} from "class-validator";

export class CreateChatRoomDto{
    @IsEmpty()
    _id?: any;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    chat_room_name: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    chat_room_image: string[];

    @ApiProperty()
    @IsBoolean()
    single_room: boolean = false;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    participants_id: string[];

}