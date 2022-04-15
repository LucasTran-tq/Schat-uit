import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { CreateChatRoomDto } from '../dto/create-chat_room.dto';
import { ChatRoomRepository } from '../repositories/chat_room.repository';
import { ChatRoom } from '../schemas/chat_room.schema';

@Injectable()
export class ChatRoomService {
    constructor(
        private readonly chatRoomRepository: ChatRoomRepository,
        private readonly userRepository: UserRepository) { }

    public async createChatRoom(chatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        try {
            const { participants_id, ...chatRoom } = chatRoomDto;
            const users = await this.userRepository.getAllUser({ _id: participants_id });
            console.log(users);
            
            return await this.chatRoomRepository.create({ participants: users, ...chatRoom});
        }
        catch (err) {
            return err;
        }
    }

    public async getAllChatRoom(userId: String): Promise<ChatRoom[]> {
        return await this.chatRoomRepository.getAll({participants: {$in: [userId]}});
    }

    public async checkUserInChatRoom(chatRoomId: string,userId: string): Promise<ChatRoom> {
        return this.chatRoomRepository.getOne({_id: chatRoomId, participants: {$in: [userId]}});
    }

    public async checkParticipantsInRoom(usersId: string[]): Promise<ChatRoom> {
        return this.chatRoomRepository.getOne({participants: usersId, single_room: true});
    }

    public async getChatRoomById(chatRoomId: string): Promise<ChatRoom> {
        return await this.chatRoomRepository.getById(chatRoomId);
    }

    public async updateChatRoomById(chatRoomId: string, chatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        return await this.chatRoomRepository.updateById(chatRoomId, chatRoomDto);
    }

    public async deleteChatRoomById(chatRoomId: String): Promise<ChatRoom> {
        return this.chatRoomRepository.deleteById(chatRoomId);
    }

}