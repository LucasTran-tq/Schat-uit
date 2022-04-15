import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { ChatRoom } from "src/chat/schemas/chat_room.schema";
export type ChatMessageDocument = ChatMessage & mongoose.Document;
@Schema()
export class ChatMessage {

    @Transform(({ value }) => value.toString())
    _id?: mongoose.ObjectId;
    @Prop()
    message_type: Number;
    @Prop()
    message_content: String;
    @Prop()
    message_time: Date;
    @Transform(({ value }) => value.toString())
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ChatRoom.name })
    @Type(() => ChatRoom)
    chat_room: ChatRoom
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    user: User

}
export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);