import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { TwilioModule } from 'nestjs-twilio';
import * as Joi from 'joi';
import { AppGateway } from './gateways/app.gateway';
import { User, UserSChema } from './auth/schemas/user.schema';
import { UserRepository } from './auth/repositories/user.repository';
import { AuthService } from './auth/services/auth.service';
import { BlockchainService } from './auth/services/blockchain.service';
import { SmsRespository } from './auth/repositories/sms.respository';
import { Sms, SmsSChema } from './auth/schemas/sms.schema';
import { ChatRoomService } from './chat/services/chat_room.service';
import { ChatMessageService } from './chat/services/chat_message.service';
import { ChatRoomRepository } from './chat/repositories/chat_room.repository';
import { ChatMessageRepository } from './chat/repositories/chat_message.repository';
import { ChatRoom, ChatRoomSchema } from './chat/schemas/chat_room.schema';
import {
  ChatMessage,
  ChatMessageSchema,
} from './chat/schemas/chat_message.schema';
import { SmsServices } from './auth/services/sms.service';
import { TwilioServices } from './auth/services/twilio.service';
import { ChatMessageController } from './chat/chat_message.controller';
import { ChatRoomController } from './chat/chat_room.controller';
import { TaskManagermentController } from './task_managerment/task_managerment.controller';
import { Field, FieldSchema } from './task_managerment/schemas/field.schema';
import { FieldController } from './task_managerment/field.controller';
import { FieldService } from './task_managerment/services/field.service';
import { FieldRepository } from './task_managerment/repositories/field.repository';
import {
  TaskManagerment,
  TaskManagermentSchema,
} from './task_managerment/schemas/task_managerment.schema';
import { TaskCategoryController } from './task_managerment/task_category.controller';
import {
  TaskCategory,
  TaskCategorySchema,
} from './task_managerment/schemas/task_category.schema';
import { TaskCategoryService } from './task_managerment/services/task_category.service';
import { TaskCategoryRepository } from './task_managerment/repositories/task_category.repository';
import { TaskController } from './task_managerment/task.controller';
import { Task, TaskSchema } from './task_managerment/schemas/task.schema';
import { TaskRepository } from './task_managerment/repositories/task.repository';
import { TaskService } from './task_managerment/services/task.service';
import { TaskManagermentGateway } from './task_managerment/gateways/task_managerment.gateway';
import { ChatGateway } from './chat/gateways/chat.gateway';
import {
  PostCategory,
  PostCategorySchema,
} from './post_management/schemas/post_category.schema';
import { Post, PostSchema } from './post_management/schemas/post.schema';
import {
  Organization,
  OrganizationSchema,
} from './post_management/schemas/organization.schema';
import { PostService } from './post_management/services/post.service';
import { PostCategoryService } from './post_management/services/post_category.service';
import { OrganizationService } from './post_management/services/organization.service';
import { PostRepository } from './post_management/repositories/post.repository';
import { PostCategoryRepository } from './post_management/repositories/post_category.repository';
import { OrganizationRepository } from './post_management/repositories/organization.repository';
import { PostManagementGateway } from './post_management/gateways/post_management.gateway';
import { StreamingFileController } from './streaming-file/streaming-file.controller';
import { StreamingFileService } from './streaming-file/streaming-file.service';
import { BlockchainConnectionService } from 'smart_contract/connection';
import { ChatController } from './chat/chat.controller';
import { CryptoFileService } from './chat/services/crypto_file_ipfs';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

require('dotenv').config();

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public/assets/decryptedFiles'),
    //   renderPath: 'public'
    // }),
    MorganModule,
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_Lucas),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TWILIO_ACCOUNT_SID: Joi.string(),
        TWILIO_AUTH_TOKEN: Joi.string(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        WEB3_ACCOUNT: Joi.string().required(),
        WEB3_ADDRESS: Joi.string().required(),
        WEB3_PORT: Joi.string().required(),
      }),
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),

    //TODO: Add schemas here
    /* Schemas */
    MongooseModule.forFeature([
      { name: Sms.name, schema: SmsSChema },
      { name: User.name, schema: UserSChema },
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: ChatMessage.name, schema: ChatMessageSchema },
      { name: Field.name, schema: FieldSchema },
      { name: TaskCategory.name, schema: TaskCategorySchema },
      { name: Task.name, schema: TaskSchema },
      { name: TaskManagerment.name, schema: TaskManagermentSchema },
      { name: PostCategory.name, schema: PostCategorySchema },
      { name: Post.name, schema: PostSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [
    AppController,
    AuthController,
    ChatController,
    ChatMessageController,
    ChatRoomController,
    TaskManagermentController,
    FieldController,
    TaskCategoryController,
    TaskController,
    StreamingFileController,
  ],
  providers: [
    //TODO: Add services here
    /* Serivces */
    //Auth
    AppService,
    AuthService,
    BlockchainService,
    BlockchainConnectionService,
    SmsServices,
    TwilioServices,

    //ChatRoom
    ChatRoomService,

    //ChatMesage
    ChatMessageService,
    CryptoFileService,

    //TaskManagerment
    FieldService,
    TaskCategoryService,
    TaskService,

    // PostManagement
    PostService,
    PostCategoryService,
    OrganizationService,

    //TODO: Add Repositories here
    /* Repositories */
    UserRepository,
    SmsRespository,
    ChatRoomRepository,
    ChatMessageRepository,

    FieldRepository,
    TaskCategoryRepository,
    TaskRepository,

    // PostManagement
    PostRepository,
    PostCategoryRepository,
    OrganizationRepository,

    // TODO: SOCKET HERE
    /* Socket Providers */
    ChatGateway,
    TaskManagermentGateway,
    PostManagementGateway,

    //streaming File
    StreamingFileService,

    /* Other Providers */
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
