import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { SmsVerificationDto } from './dto/sms-verification.dto';
import { Sms } from './schemas/sms.schema';
import { AuthService } from './services/auth.service';
import { SmsServices } from './services/sms.service';

/* Controller handle router api */
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly smsService: SmsServices,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  public async signup(@Body() infoSignup: SignupDto): Promise<Sms> {
    return await this.smsService.signup(infoSignup);
  }

  @Post('/login')
  public async login(@Body() infoLogin: LoginDto): Promise<Sms> {
    return await this.smsService.login(infoLogin);
  }

  @Post('/sms-verification')
  public async smsVerification(@Body() verification: SmsVerificationDto) {
    return this.smsService.smsVerification(verification);
  }

  // ! interacting with blockchain
  // create new Pubkey
  @Post('blockchain/createNewPub')
  public async createNewPub(@Request() req, @Body() newUser_BC: any) {
    const accessToken = req.header('Authorization').split(' ')[1];

    return this.authService.createNewPub(accessToken, newUser_BC);
  }

  // get pubkey by phone
  @Get('blockchain/getPubKeyUser/:phoneNumber')
  public async getPubKeyUser(@Param('phoneNumber') phoneNumber) {
    return this.authService.getPubKeyUser(phoneNumber);
  }
}
