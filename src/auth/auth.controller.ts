import { Body, Controller, Post} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { SmsVerificationDto } from './dto/sms-verification.dto';
import { Sms } from './schemas/sms.schema';
import { SmsServices } from './services/sms.service';

/* Controller handle router api */
@Controller('/auth')
export class AuthController {
  constructor(private readonly smsService: SmsServices) {}

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
}
