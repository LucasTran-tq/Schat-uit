/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { execFile } from 'child_process';
import { fsync } from 'fs';
import { LoginDto } from './dto/login.dto';
import { SendCSRDto } from './dto/sendCsr';
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

  @Post('/signClientCert')
  public async signClientCert(@Body() clientCSR: any) {
    // -> sign (pk, csr) -> crt
    // client send CSR to server
    // server sign the CSR -> CRT
    // server send CRT to client

    // The flow
    // write csr file
    // put some argument into .sh file
    // run .sh file -> to sign csr -> DONE
    // write crt file
    // read crt file -> return.
    return this.authService.signClientCert(clientCSR);
  }

  // for testing
  @Get('/createClientCert')
  public async createClientCert() {
    return this.authService.createClientCert();
  }
}
