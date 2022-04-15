import { ApiProperty } from '@nestjs/swagger';
import { IsString,IsNumber, IsDate, IsEmpty } from 'class-validator';
export class ChatMessageDto{
    @IsEmpty()
    _id?: any;

    @ApiProperty()
    @IsNumber()
    message_type: number;

    @ApiProperty()
    @IsString()
    message_content:string;

    @ApiProperty()
    @IsDate()
    message_time:Date;

    @ApiProperty()
    @IsString()
    chat_room_id: string;
}