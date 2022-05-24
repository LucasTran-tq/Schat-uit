import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { User } from 'src/auth/schemas/user.schema';
import { ChatMessageDto } from 'src/chat/dto/chat_message.dto';
import { ChatWithAnotherUserDto } from 'src/chat/dto/chat_with_another_user.dto';
import { CreateChatRoomDto } from 'src/chat/dto/create-chat_room.dto';
import { ChatRoom } from 'src/chat/schemas/chat_room.schema';
import { AppGateway } from 'src/gateways/app.gateway';
import { PaginateChatRoomDto } from '../dto/paginate_chat_room.dto';
import { ChatMessage } from '../schemas/chat_message.schema';
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway
  extends AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  public async handleConnection(client: Socket): Promise<ChatRoom[]> {
    try {
      const user = await this.getUserClient(client);
      if (!user) {
        return this.server.emit('error', {
          statusCode: 404,
          success: false,
          message: 'User do not exist',
        });
      } else {
        client.join(user._id.toString());
        return await this.handleGetAllChatRoomForUser(client);
      }
    } catch (err) {
      return this.server.to(client.id).emit('error', {
        statusCode: 404,
        success: false,
        message: err.message
      });
    }
  }

  @SubscribeMessage('getListRoomForUser')
  public async handleGetAllChatRoomForUser(client: Socket): Promise<ChatRoom[]> {
    try {
      const user = await this.getUserClient(client);
      const userId = user._id.toString();
      const lastMessages = await this.getAllChatRooms(userId, 0);
      //Chỉ trả về client đã kết nối
      // console.log(lastMessages);
      
      return await this.server.to(client.id).emit('lastMessages', lastMessages);
    }
    catch (err) {
      return await this.server.to(client.id).emit('error', {
        statusCode: 404,
        success: false,
        message: err.message
      });
    }
  }

  public async getAllChatRooms(userId: string, page: number): Promise<ChatMessage[]> {
    const chatRooms = await this.getChatRoomService.getAllChatRoom(userId, page);
    const lastMessages = await this.getChatMessageService.getLastMessageOnRooms(chatRooms);
    return lastMessages;
  }

  public async handleDisconnect(client: Socket): Promise<User> {
    try {
      const user = await this.getUserClient(client);
      const userId = user._id.toString();
      const disconnected_time = new Date(client.handshake.time);

      const timeUser = (
        await this.getAuthService.updateDisconnectedTimeUser(
          userId,
          disconnected_time,
        )
      ).disconnected_time;
      const chatRooms: ChatRoom[] =
        await this.getChatRoomService.getAllChatRoom(userId,0);
      chatRooms.map(async (chatRoom: ChatRoom) => {
        chatRoom.participants.length == 2
          ? client.in(chatRoom._id.toString()).emit('notification', timeUser)
          : null;
      });
    } catch (err) {
      return await this.server.to(client.id).emit('error', err);
    }
  }
  //TODO: Handle message when user send in room
  @SubscribeMessage('sendMessage')
  public async handleMessage(client: Socket, chatMessageDto: ChatMessageDto) {
    try {
      //TOdO: Check user have connected in room
      const user = await this.getUserClient(client);
      const userClientId = user._id.toString();

      const chatRoom = await this.getChatRoomService.checkUserInChatRoom(chatMessageDto.chat_room_id.toString(), userClientId);
      //TODO: Create room chat realtime
      if (chatRoom) {
        /**
         * 1. create message.
         * 2. emit chat room updated to room.
         * 3. emit send message to room
         */
        const chatMessageClient = await this.getChatMessageService.createChatMessage(userClientId, chatMessageDto);
        chatRoom.participants.map(async participant => {
          if (participant._id.toString() != user._id.toString()) {
            await this.server.to(participant._id.toString()).emit('newMessageOnRoom', chatMessageClient)
          }
        });
        return await this.server.to(chatRoom._id.toString()).emit('messageClient', chatMessageClient);
      }
      else {
        return await this.server.to(client.id).emit('error', {
          statusCode: 404,
          success: false,
          message: 'Chat room do not exist'
        });
      }
    } catch (err) {
      return await this.server.to(client.id).emit('error', {
        statusCode: 404,
        success: false,
        message: 'User do not exist'
      });
    }
  }

  @SubscribeMessage('singleRoom')
  public async checkUserOnRoom(client: Socket, userId: string): Promise<any> {
    console.log()
    try {
      const user = await this.getUserClient(client);
      const anotherUser = await this.getAuthService.findUserById(userId);
      console.log(user._id.toString())
      console.log(userId)
      const room: ChatRoom =
        await this.getChatRoomService.checkParticipantsInRoom([
          anotherUser._id.toString(),
          user._id.toString(), 
        ]);
        console.log(room)
      if (!room) {
        return null;
      }
      return await this.handleJoinRoom(client, room._id.toString());
    } catch (err) {
      return await this.server.to(client.id).emit('error', {
        statusCode: 404,
        success: false,
        message: 'User do not exist',
      });
    }
  }

  // create room
  // DTO {user_id[]}
  // TODO: CHECK 2 users have same room in controller.
  @SubscribeMessage('chatSingle')
  public async chatSingle(client: Socket, chatWithAnotherUser: ChatWithAnotherUserDto) {
    // TODO: create room for 2 user. Because have not for loop for createUser in service
    const roomId = chatWithAnotherUser.chat_message.chat_room_id;
    const user = await this.getUserClient(client);
    const participants = [
      user._id.toString(),
      chatWithAnotherUser.another_user_id.toString(),
    ];
    if (!roomId) {
      const chatRoomDto = {
        chat_room_name: [],
        chat_room_image: [],
        single_room: true,
        participants_id: participants,
      };

      const newChatRoom: ChatRoom = await this.handleCreateChatRoom(client, chatRoomDto);
      const { chat_room_id, ...chatMessage } = chatWithAnotherUser.chat_message;
      await this.handleJoinRoom(client, newChatRoom._id.toString());
      return await this.handleMessage(client, {
        chat_room_id: newChatRoom._id.toString(),
        ...chatMessage,
      });
    } else {
      return await this.handleMessage(client, chatWithAnotherUser.chat_message);
    }
  }

  //TODO: Handle return all chat messages on room that user join
  @SubscribeMessage('joinRoom')
  public async handleJoinRoom(client: Socket, chatRoomId: string) {
    try {
      const user = await this.getUserClient(client);
      const checkUserOnRoom = await this.getChatRoomService.checkUserInChatRoom(chatRoomId, user._id.toString());
      if (checkUserOnRoom) {
        await client.join(chatRoomId.toString());
        const allMessage = await this.joinRoom(checkUserOnRoom._id.toString(), 0);
        client.emit('showAllChatOnRoom', allMessage);
      }
      else {
        return await this.server.emit('error', {
          statusCode: 404,
          success: false,
          message: 'Room do not exist'
        });
      }
    } catch (err) {
      return await this.server.emit('error', {
        statusCode: 404,
        success: false,
        message: 'User do not exist'
      });
    }
  }

  @SubscribeMessage('loadMoreChatRooms')
  public async hanldeLoadMoreChatRooms(client: Socket, page: number): Promise<any> {
    const user = await this.getUserClient(client);
    return await this.getAllChatRooms(user._id.toString(), page);
  }


  @SubscribeMessage('loadMoreMessages')
  public async handleLoadMoreMessages(client: Socket, paginateChatRoomDto: PaginateChatRoomDto): Promise<ChatMessage[]> {
    const chatRoomId = paginateChatRoomDto.chat_room_id;
    const page = paginateChatRoomDto.page;
    const messages = await this.joinRoom(chatRoomId, page);
    return await this.server.to(client.id).emit('messagesLoadMore', messages);
  }

  public async joinRoom(chatRoomId: string, page: number): Promise<ChatMessage[]> {
    const getAllChatOnRoom = await this.getChatMessageService.getAllChatInRoom(chatRoomId.toString(), page);
    return getAllChatOnRoom;
  }

  //TODO: Handle get offline time for single room when user logout
  public async getOfflineTime(client: Socket, chat_room_id: string) {
    const chatRoomId = chat_room_id;

    try {
      // in a rooom, check this room is group or private room.
      // If private room, continue, get user_id, get offline

      const chatRoom = await this.getChatRoomService.getChatRoomById(
        chatRoomId,
      );

      let anotherUser = '';
      let offlineTime = new Date('');
      if (chatRoom) {
        // how many user in chat room
        const allUserInRoom = chatRoom.participants;

        let count = 0;
        allUserInRoom.forEach(() => {
          count++;
        });

        // if this is private room
        if (count == 2) {
          const user = await this.getUserClient(client);

          allUserInRoom.forEach((userInRoom: User) => {
            if (userInRoom._id.toString() != user._id.toString()) {
              anotherUser = userInRoom._id.toString();
            }
          });

          const timeNow = new Date(client.handshake.time);

          offlineTime = await this.getAuthService.getOfflineTimeByUser(
            anotherUser,
            timeNow,
          );
        }
      }
      client.emit('offlineTime', offlineTime);
    } catch (err) {
      return {
        statusCode: 500,
        success: false,
        message: err.message,
      };
    }
  }

  @SubscribeMessage('chatGroup')
  public async hanldeChatGroup(client: Socket, chatRoomDto: CreateChatRoomDto): Promise<any> {
    try {
      const user = await this.getUserClient(client);
      const { participants_id, ...chatRoom } = chatRoomDto
      const newChatGroup = await this.handleCreateChatRoom(client, {
        participants_id: [user._id.toString(), ...participants_id],
        ...chatRoom
      });
      client.join(newChatGroup._id.toString());
      await this.joinRoom(newChatGroup._id.toString(), 1);
      return newChatGroup;
    }
    catch (err) {
      return await this.server.to(client.id).emit('error', {
        statuscode: 500,
        success: false,
        message: err.message
      });
    }

    // return await this.server.to()
  }


  //TODO: create chat room with many users
  public async handleCreateChatRoom(client: Socket, chatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
    const newChatRoom = await this.getChatRoomService.createChatRoom(chatRoomDto);
    console.log(newChatRoom);

    newChatRoom.participants.map(async chatRoom => await this.server.to(chatRoom._id.toString()).emit('newRoom', newChatRoom));
    await this.handleJoinRoom(client, newChatRoom._id.toString());
    return newChatRoom;
  }


  @SubscribeMessage('searchUserByPhone')
  public async handleSearchUserByPhone(client: Socket, phone: string) {
    try {
      const user = await this.getAuthService.findUserByPhone(phone);

      if (user) {
        this.server.to(client.id).emit('getUserByPhone', user);
      } else {
        this.server.to(client.id).emit('getUserByPhone', 'Can not find user');
      }
    } catch (err) {
      return this.server.emit('error', {
        statusCode: 404,
        success: false,
        message: 'User do not exist'
      });
    }
  }
}
