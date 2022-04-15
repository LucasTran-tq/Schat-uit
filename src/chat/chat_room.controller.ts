import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationGuard } from 'src/auth/guards/authen-jwt.guard';
import { CreateChatRoomDto } from './dto/create-chat_room.dto';
import { ChatRoom } from './schemas/chat_room.schema';
import { ChatRoomService } from './services/chat_room.service';

class UserDto{
    user1Id: string;
    user2Id: string;
}
@UseGuards(AuthenticationGuard)
@Controller('/chat-room')
export class ChatRoomController {
    constructor(private readonly chatRoomService: ChatRoomService){}
    @Post('/create')
    public async crateChatRoom(@Body() chatRoomDto: CreateChatRoomDto, @Req() req: Request): Promise<ChatRoom>{
        return this.chatRoomService.createChatRoom(chatRoomDto);
    }

    @Get('/all-room-by-user/:userId')
    public async getAllChatRoom(@Param('userId') userId: String): Promise<ChatRoom[]>{
        return this.chatRoomService.getAllChatRoom(userId);
    }

    @Get('/find-by-id/:id')
    public async getChatRoomById(@Param('id') chatRoomId: string): Promise<ChatRoom>{
        return this.chatRoomService.getChatRoomById(chatRoomId);
    }

    @Patch('/update-by-id/:id')
    public async updateChatRoomById(@Param('id') chatRoomId: string, @Body() chatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        return await this.chatRoomService.updateChatRoomById(chatRoomId, chatRoomDto);
    }

    @Get('demo')
    public async getMessageDuplicate(@Body() usersId: string[]): Promise<any>{
        return this.chatRoomService.checkParticipantsInRoom(usersId);
    }

    @Delete('/delete/:id')
    public async deleteChatRoomById(@Param('id') chatRoomId: String): Promise<ChatRoom> {
        return await this.chatRoomService.deleteChatRoomById(chatRoomId);
    }




}