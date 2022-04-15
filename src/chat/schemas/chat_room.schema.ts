import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import * as mongoose from 'mongoose';
import { User } from "src/auth/schemas/user.schema";


export type ChatRoomDocument = ChatRoom & mongoose.Document;

@Schema()
export class ChatRoom {
    @Transform(({ value }) => value.toString())
    _id?: mongoose.ObjectId;

    @Prop({ required: true })
    chat_room_name: string[];

    @Prop({ required: true })
    chat_room_image: string[];


    @Prop({ required: true })
    single_room: boolean;

    @Prop({
        type: [{ type: mongoose.Types.ObjectId, ref: User.name }]
    })
    @Type(() => User)
    participants: User[];

}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);