import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatMessageRepository } from 'src/chat/repositories/chat_message.repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthorizationGuard implements CanActivate {
    constructor(private readonly chatMessageRepository: ChatMessageRepository) { }
    async checkJwtAuthorization(req: any, res: any): Promise<boolean> {
        try {
            const accessToken = await req.header('Authorization').split(' ')[1];
            const decodeAccessToken = jwt.decode(accessToken);
            const chatRoomId = await req.url.split('/')[req.url.split('/').length - 1];
            const userId = decodeAccessToken['user_id'];
            const chatMessage = await this.chatMessageRepository.findOne({
                user: userId,
                message_type: 1,
                chat_room: chatRoomId
            });
            if (chatMessage) {
                return true;
            }else{
                return false;
            }
           
        }
        catch (err) {
            return err;
        }
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        return this.checkJwtAuthorization(req, res);
    }
}