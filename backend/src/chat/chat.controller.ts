import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
const multer = require('multer');

/* Controller handle router api */
@Controller('/chat')
export class ChatController {
  constructor() {}

  // save file
   
  // get file

  // ! interacting with blockchain
  //   // create new Pubkey
  //   @Post('blockchain/createNewPub')
  //   public async createNewPub(@Request() req, @Body() newUser_BC: any) {
  //     const accessToken = req.header('Authorization').split(' ')[1];

  //     return this.authService.createNewPub(accessToken, newUser_BC);
  //   }

  //   // get pubkey by phone
  //   @Get('blockchain/getPubKeyUser/:phoneNumber')
  //   public async getPubKeyUser(@Param('phoneNumber') phoneNumber) {
  //     return this.authService.getPubKeyUser(phoneNumber);
  //   }
}
