import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ChatMessageDocument, ChatMessage } from "../schemas/chat_message.schema";
import {Model, FilterQuery} from "mongoose";

@Injectable()
export class ChatMessageRepository{
    constructor(@InjectModel(ChatMessage.name) private chatmessageModel:Model<ChatMessageDocument>){}
   public async create(chatMessage:ChatMessage): Promise<ChatMessage> {
    //   const newChatMessage = new this.chatmessageModel(chatMessage);  
        return await new this.chatmessageModel(chatMessage).save()

   }

//    public async findAll(): Promise<ChatMessage[]>{
//     return await this.chatmessageModel.find();
//    }

//    public async findOne(chatMessageFilterQuery: FilterQuery<ChatMessage>){
//     return await this.chatmessageModel.findOne({ chatMessageFilterQuery });
// }

public async findAllById(chatMessageFilterQuery: FilterQuery<ChatMessage>): Promise<ChatMessage[]>{
    return await this.chatmessageModel.find(chatMessageFilterQuery).populate('user');
}

   public async findOne(chatMessageFilterQuery: FilterQuery<ChatMessage>):Promise<ChatMessage>{
        return await this.chatmessageModel.findOne(chatMessageFilterQuery); 
   }

   public async findById(chatMessageId: string): Promise<ChatMessage>{
       return await this.chatmessageModel.findById(chatMessageId);
   }

   

//    public async updateById(message_content,chatmessageupdate:ChatMessageUpdateDto): Promise<ChatMessage>{
//        return await this.chatmessageModel.findOneAndUpdate(message_content,chatmessageupdate)
//    }

   public async delete(chat_message_id: string): Promise<any>{
       return await this.chatmessageModel.findByIdAndDelete(chat_message_id);
   }
}