import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from '../dto/signup.dto';
import { SmsVerificationDto } from '../dto/sms-verification.dto';
import { SmsRespository } from '../repositories/sms.respository';
import { AuthService } from './auth.service';
import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from '../dto/login.dto';
require('dotenv').config();
/* Provider services handle SmsSerivces  */
@Injectable()
export class SmsServices {
  constructor(
    private readonly smsRespository: SmsRespository,
    private readonly authService: AuthService,
    private readonly userRepos: UserRepository,
  ) {}

  private createOTP(): number {
    const minm = 100000;
    const maxm = 999999;
    // return Math.floor(111111);
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }

  private async checkValidOTP(smsVerification: SmsVerificationDto): Promise<any> {
    const smsModel = await this.smsRespository.smsVerification({
      phone_number: smsVerification.phone_number,
      otp: smsVerification.otp,
    });
    if (smsModel) {
      //Delete SMS when user has authenticate on mobile phone
      await this.smsRespository.smsDelete({phone_number: smsVerification.phone_number});
      return await this.authService.successAuthOTP(smsVerification);
    } else {
      throw new UnauthorizedException(
        'Xác thực không thành công',
        'Lỗi xác thực OTP',
      );
    }
  }

  //Register SMS
  public async signup(signup: SignupDto): Promise<any> {
    const OTP: number = this.createOTP();
    const phoneNumber: string = signup.phone_number;
    const existPhoneNumber = await this.userRepos.getUser({
      phone_number: phoneNumber,
    });
    if (!existPhoneNumber) {
      return await this.authService.successRegister(signup, OTP);
    } else {
      throw new UnauthorizedException(
        'Số điện thoại này đã được đăng ký, vui lòng nhập số khác',
        'Lỗi đăng ký',
      );
    }
  }

  //Login
  public async login(login: LoginDto): Promise<any> {
    const phoneNumber = await this.userRepos.getUser({
      phone_number: login.phone_number,
    });
    const OTP = this.createOTP();
    if (!phoneNumber) throw new UnauthorizedException('Số điện thoại không hợp lệ', 'Lỗi đăng nhập')
    return await this.authService.successLogin(login, OTP);
    
  }

  //Authentication - send OTP to server
  public async smsVerification(smsVerificationRequest: SmsVerificationDto): Promise<any> {
    return this.checkValidOTP(smsVerificationRequest);
  }

}
