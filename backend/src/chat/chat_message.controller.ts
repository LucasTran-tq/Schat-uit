import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationGuard } from 'src/auth/guards/authen-jwt.guard';
import { JwtAuthorizationGuard } from 'src/auth/guards/author-jwt.guard';
import { ChatMessageDto } from './dto/chat_message.dto';
import { ChatMessage } from './schemas/chat_message.schema';
import { ChatMessageService } from './services/chat_message.service';
import * as jwt from 'jsonwebtoken'
import { PaginateChatRoomDto } from './dto/paginate_chat_room.dto';

@UseGuards(AuthenticationGuard)
@Controller('chat-message')
export class ChatMessageController {
    constructor(private readonly chatMessageService: ChatMessageService) { }

    @Post('/create')
    async createChatMessage(@Body() chatmessageDto: ChatMessageDto, @Req() req: Request): Promise<ChatMessage> {
        const userId = jwt.decode(req.header('Authorization').split(' ')[1])['user_id'];
        return this.chatMessageService.createChatMessage(userId, chatmessageDto);
    }

    @Get('/load-more-message')
    public async loadMoreMessages(@Body() paginateChatRoomDto: PaginateChatRoomDto): Promise<any>{
        return {
            on: 'messageLoadMore',
            emit: 'loadMoreMessages',
            url: 'http://localhost:5000/chat'
        }
    }
    // @Get()
    // async findAll(){
    //     return await  this.chatmessagereposity.findAll(); 
    // }

    // @Get('/findone/:chat_room')
    // async findOne(@Param('chat_room') chat_room: any): Promise<any>{
    //     return await this.chatMessageService.findOne(chat_room);
    // }

    // @Get('/findbyid/:_id')
    // async findById(@Param('_id') chatRoomId){
    //     return await this.chatMessageService.findById(chatRoomId)
    // }
    // @UseGuards(JwtAuthorizationGuard)
    // @Get('/sum-message/:chat_room_id')
    // async findOnee(@Param('chat_room_id') chatRoom: String, @Query('n') number: number) {
    //     return await this.chatMessageService.getsummessage(chatRoom, number);
    // }
    

    // @Delete('/delete/:chat_message_id')
    // async deleteById(@Param('chat_message_id') chat_message_id: string) {
    //     // const deleteByIdchatmessage = this.chatmessagereposity.delete(id)
    //     return await this.chatMessageService.deleteById(chat_message_id);
    // }
}