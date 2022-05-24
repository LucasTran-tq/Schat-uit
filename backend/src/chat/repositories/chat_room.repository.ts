import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomDocument } from '../schemas/chat_room.schema';
import {Model, FilterQuery} from 'mongoose';
@Injectable()
export class ChatRoomRepository {
    constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoomDocument>) {}
    

    public async create(chatRoom: ChatRoom): Promise<ChatRoom> {
        const newChatRoom =  new this.chatRoomModel(chatRoom);
        return await newChatRoom.save();
    }


    public async getAll(chatRoomFilterQuery: FilterQuery<ChatRoom>,page: number): Promise<ChatRoom[]> {
        // return await this.chatRoomModel.find(chatRoomFilterQuery).populate(['participants']).limit(10).skip(10*page);
        return await this.chatRoomModel.find(chatRoomFilterQuery).populate(['participants']);
    }


    public async getOne(chatRoomFilterQuery: FilterQuery<ChatRoom>): Promise<ChatRoom>{
        return await this.chatRoomModel.findOne(chatRoomFilterQuery);
    }

    public async getById(chatRoomId: String): Promise<ChatRoom> {
        return await this.chatRoomModel.findById(chatRoomId).populate(['participants']);
    }


    public async updateById(chatRoomId: String, chatRoomFilterQuery: Partial<ChatRoom>): Promise<ChatRoom>{
        return await this.chatRoomModel.findByIdAndUpdate(chatRoomId, chatRoomFilterQuery);
    }


    public async deleteById(chatRoomId: String): Promise<ChatRoom>{
        return await this.chatRoomModel.findByIdAndRemove(chatRoomId);
    }
}