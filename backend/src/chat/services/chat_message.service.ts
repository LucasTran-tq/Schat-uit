/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { ChatRoomRepository } from 'src/chat/repositories/chat_room.repository';
import { ChatMessageDto } from '../dto/chat_message.dto';
import { ChatMessageRepository } from '../repositories/chat_message.repository';
import { ChatMessage } from '../schemas/chat_message.schema';
import { ChatRoom } from '../schemas/chat_room.schema';
import { StreamingFileService } from '../../streaming-file/streaming-file.service';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly userRepository: UserRepository,
    private readonly streamingFileService: StreamingFileService,
  ) { }
  //ChatMessage | Boolean
  public async createChatMessage(userId: string, chatMessageDto: ChatMessageDto): Promise<any> {
    try {
      const user = await this.userRepository.getUser({ _id: userId });
      const chatRoom = await this.chatRoomRepository.getOne({
        _id: chatMessageDto.chat_room_id,
      });

      let _chatMessageDto:ChatMessageDto = {...chatMessageDto};

      if(chatMessageDto.message_type != 2){
        _chatMessageDto = await this.streamingFileService.handleSaveFile(chatMessageDto);
      }

      if (chatRoom) {
        return await this.chatMessageRepository.create({
          user: user,
          chat_room: chatRoom,
          ..._chatMessageDto,
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

  // public async getsummessage(chatRoomId: String, n: number): Promise<any> {
  //   try {
  //     const chatMessageInRoom = await this.chatMessageRepository.findAll({ chat_room: { $in: [chatRoomId] } });

  //     // console.log(chatMessageInRoom);

  //     const chatRoom = await this.chatRoomRepository.getOne({ _id: chatRoomId });

  //     let sum = 0;
  //     let sumarray = []
  //     let nchat = []
  //     chatMessageInRoom.forEach(e => {
  //       if (chatRoom._id.toString() == e.chat_room.toString()) {
  //         sumarray.push(e._id)
  //       }
  //     })
  //     while (n > 0) {
  //       const getnchat = await this.chatMessageRepository.findOne({ _id: sumarray[sumarray.length - 1 - sum] })
  //       nchat.push(getnchat)
  //       sum++
  //       n--;
  //     }
  //     return nchat;
  //   }
  //   catch (err) {
  //     return err;
  //   }

  // }

  public async getLastMessageOnRooms(chatRooms: ChatRoom[]): Promise<ChatMessage[]> {
    const lastMessageList = [];
    let sortByDate = (a: any, b: any) => {
      if (a.last_message !== null && b.last_message !== null) {
        return b.last_message.message_time - a.last_message.message_time;
      }
    }
    const lastMessagePromise = chatRooms.map(async chatRoom => {
      return {
        chat_room: chatRoom,
        last_message: await this.chatMessageRepository.findAllLimit({ chat_room: chatRoom._id.toString() })
      }
    });
    for (let i = 0; i < lastMessagePromise.length; i++) {
      lastMessageList.push(await lastMessagePromise[i]);
    }

    return lastMessageList.sort(sortByDate);
  }

  public async findByRoomId(chatRoomId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findById(chatRoomId);
  }

  public async deleteById(chatRoomId: any): Promise<ChatMessage> {
    return await this.chatMessageRepository.delete(chatRoomId);
  }

  public async getAllChatInRoom(chatRoomId: String, page: number): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.findAll({ chat_room: { $in: [chatRoomId] } },page);
  }

}
