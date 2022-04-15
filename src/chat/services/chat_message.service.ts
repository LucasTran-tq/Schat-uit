/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { ChatRoomRepository } from 'src/chat/repositories/chat_room.repository';
import { ChatMessageDto } from '../dto/chat_message.dto';
import { ChatMessageRepository } from '../repositories/chat_message.repository';
import { ChatMessage } from '../schemas/chat_message.schema';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly userRepository: UserRepository,
  ) { }
  //ChatMessage | Boolean
  public async createChatMessage(userId: string, chatMessageDto: ChatMessageDto): Promise<any> {
    try {
      const user = await this.userRepository.getUser({ _id: userId });
      const chatRoom = await this.chatRoomRepository.getOne({
        _id: chatMessageDto.chat_room_id,
      });
      if (chatRoom) {
        return await this.chatMessageRepository.create({
          user: user,
          chat_room: chatRoom,
          ...chatMessageDto,
        });
      } else {
        return {
          statusCode: 404,
          success: false,
          message: 'Phòng chat không tồn tại'
        };
      }
    }
    catch (err) {
      return err;
    }
  }

  public async getsummessage(chatRoomId: String, n: number): Promise<any> {
    try {
      const chatMessageInRoom = await this.chatMessageRepository.findAllById({ chat_room: { $in: [chatRoomId] } });

      // console.log(chatMessageInRoom);

      const chatRoom = await this.chatRoomRepository.getOne({ _id: chatRoomId });

      let sum = 0;
      let sumarray = []
      let nchat = []
      chatMessageInRoom.forEach(e => {
        if (chatRoom._id.toString() == e.chat_room.toString()) {
          sumarray.push(e._id)
        }
      })
      while (n > 0) {
        const getnchat = await this.chatMessageRepository.findOne({ _id: sumarray[sumarray.length - 1 - sum] })
        nchat.push(getnchat)
        sum++
        n--;
      }
      return nchat;
    }
    catch (err) {
      return err;
    }

  }

  // async findOne(chatRoomId: String, userId: String): Promise<ChatMessage> {
  //   return await this.chatMessageRepository.findOne({
  //     chat_room: chatRoomId,
  //     user: userId,
  //     message_type: 1,
  //   });
  // }

  public async findByRoomId(chatRoomId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findById(chatRoomId);
  }

  public async deleteById(chatRoomId: any): Promise<ChatMessage> {
    return await this.chatMessageRepository.delete(chatRoomId);
  }

  public async getAllChatInRoom(chatRoomId: String): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.findAllById({chat_room: { $in: [chatRoomId] }});
  }

  // public async getUsersInRoom(chatRoomId: string): Promise<ChatMessage[]> {
  //   // return list of user in room
  //   return await this.chatMessageRepository.findAllById({
  //     chat_room: { $in: [chatRoomId] },
  //     message_type: 1
  //   });
  // }


}
