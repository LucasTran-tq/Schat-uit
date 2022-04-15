import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { User } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth.service';
import { ChatMessageService } from 'src/chat/services/chat_message.service';
import { ChatRoomService } from 'src/chat/services/chat_room.service';
import { OrganizationService } from 'src/post_management/services/organization.service';
import { PostService } from 'src/post_management/services/post.service';
import { PostCategoryService } from 'src/post_management/services/post_category.service';
import { TaskService } from 'src/task_managerment/services/task.service';
@WebSocketGateway(5000)
export abstract class AppGateway {
  constructor(
    private authService: AuthService,

    //Chats
    private chatRoomService: ChatRoomService,
    private chatMessageService: ChatMessageService,

    //Actions
    private taskSerivce: TaskService,

    // Post_management
    private postCategoryService: PostCategoryService,
    private postService: PostService,
    private organizationService: OrganizationService, //#endregion
  ) {}

  //#region Get Set Properties
  get getAuthService(): AuthService {
    return this.authService;
  }

  set setAuthService(authService: AuthService) {
    this.authService = authService;
  }

  get getChatRoomService(): ChatRoomService {
    return this.chatRoomService;
  }

  set setChatRoomService(chatRoomService: ChatRoomService) {
    this.chatRoomService = chatRoomService;
  }

  get getChatMessageService(): ChatMessageService {
    return this.chatMessageService;
  }

  set setChatMessageService(chatMessageService: ChatMessageService) {
    this.chatMessageService = chatMessageService;
  }

  get getTaskService(): TaskService {
    return this.taskSerivce;
  }

  // POST MANAGEMENT
  set setPostCategoryService(postCategoryService: PostCategoryService) {
    this.postCategoryService = postCategoryService;
  }

  get getPostCategoryService(): PostCategoryService {
    return this.postCategoryService;
  }

  set setPostService(postService: PostService) {
    this.postService = postService;
  }

  get getPostService(): PostService {
    return this.postService;
  }

  set setOrganizationService(organizationService: OrganizationService) {
    this.organizationService = organizationService;
  }

  get getOrganizationService(): OrganizationService {
    return this.organizationService;
  }

  //#endregion

  //#region Properties
  @WebSocketServer()
  protected server: any;
  //#endregion

  //#region  Event methods
  protected async getUserClient(client: Socket): Promise<User> {
    try {
      const accessToken = client.handshake.headers.authorization.split(' ')[1];
      const decodeToken = await this.getAuthService.verifyToken(accessToken);
      const userId = (await decodeToken)['user_id'];

      return await this.getAuthService.findUserById(userId);
    } catch (err) {
      return this.server.to(client.id).emit('error', err);
    }
  }
  //#endregion
}
