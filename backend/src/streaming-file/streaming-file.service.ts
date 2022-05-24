import { Injectable } from '@nestjs/common';
import { ChatMessageDto } from 'src/chat/dto/chat_message.dto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StreamingFileService {


    public async handleSaveFile(chatMessageDto: ChatMessageDto): Promise<ChatMessageDto> {

        const splitMessage = chatMessageDto.message_content.split(';base64;');
        let fileName = process.env.FILE_LINK;
        let pathFile = process.env.PATH_FILE;
    
        const hash = uuidv4();
        if(splitMessage.length > 1) {
          const fileType = splitMessage[0].split('.').pop();

          fileName = hash + '.' + fileType;
          pathFile = (pathFile + hash).trim() + '.' + fileType;
          
          fs.writeFile(pathFile, splitMessage[1], { encoding: 'base64' }, async function (error) {
            if(error){
              console.log({error});
            }
          });
      
          const _chatMessageDto = {...chatMessageDto, ...{message_content: fileName}};

          return _chatMessageDto;
        }
        return  chatMessageDto;
      }
    
}
