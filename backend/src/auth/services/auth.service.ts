import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import { SmsVerificationDto } from '../dto/sms-verification.dto';
import { SmsRespository } from '../repositories/sms.respository';
import { UserRepository } from '../repositories/user.repository';
import { BlockchainService } from './blockchain.service';
import { TwilioServices } from './twilio.service';
import * as jwtRe from 'jsonwebtoken';
import { User } from '../schemas/user.schema';
import { BlockchainConnectionService } from 'smart_contract/connection';
import { ChatRoomService } from 'src/chat/services/chat_room.service';
import { ChatRoom } from 'src/chat/schemas/chat_room.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepos: UserRepository,
    private readonly blockchainService: BlockchainService,
    private readonly smsRespository: SmsRespository,
    private readonly blockchainConnectionService: BlockchainConnectionService,
    private readonly userRepository: UserRepository,
    private readonly chatRoomService: ChatRoomService,
  ) {
    this.userRepos = userRepos;
    this.smsRespository = smsRespository;
  }

  private async createAccessToken(payload: Object): Promise<string> {
    return jwtRe.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
  }

  public async successLogin(login: LoginDto, OTP: number): Promise<any> {
    const { ...loginUser } = login;
    await this.smsRespository.smsRequire({
      otp: OTP,
      ...loginUser,
    });
    const smsSend = new TwilioServices(
      new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
    );
    await smsSend.sendSMS(login.phone_number, OTP);
    // await this.blockchainService.checkUserExtis(login);
    return {
      statusCode: 200,
      success: true,
      message: 'Đăng nhập thành công!',
      data: {
        phoneNumber: login.phone_number,
      },
    };
  }

  public async successAuthOTP(smsReq: SmsVerificationDto): Promise<any> {
    const user = await this.userRepos.getUser({
      phone_number: smsReq.phone_number,
    });
    const payload = { user_id: user._id.toString() };
    const accessToken = await this.createAccessToken(payload);
    // const refreshToken = await this.createRefreshToken(payload);
    return {
      statusCode: 200,
      success: true,
      message: 'Xác thực OTP thành công',
      data: {
        user_id: user._id,
        accessToken: accessToken,
      },
    };
  }

  public async successRegister(smsReq: SignupDto, OTP: number): Promise<any> {
    const userId: any = smsReq._id;
    const phoneNumber: string = smsReq.phone_number;
    // const refreshToken = await this.createRefreshToken({
    //   _id: userId,
    //   phone_number: phoneNumber,
    // });
    const smsSend = new TwilioServices(
      new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
    );
    // await this.blockchainService.addUser(smsReq);
    const { user_name, ...smsSignup } = smsReq;
    await this.smsRespository.smsRequire({
      otp: OTP,
      ...smsSignup,
    });
    await this.userRepos.createUser({
      _id: userId,
      user_name: smsReq.user_name,
      phone_number: smsReq.phone_number,
      disconnected_time: null,
      avatar:
        'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg',
    });
    await smsSend.sendSMS(phoneNumber, OTP);
    return {
      statusCode: 200,
      success: true,
      message: 'Tạo tài khoản thành công',
      data: {
        phoneNumber: smsReq.phone_number,
      },
    };
  }

  public async findAllUserById(userId: string[]): Promise<User[]> {
    return await this.userRepos.getAllUser({ _id: userId });
  }

  public async updateDisconnectedTimeUser(
    user_id: string,
    disconnected_time: Date,
  ): Promise<User> {
    return await this.userRepos.updateUser(user_id, disconnected_time);
  }

  public async findUserById(userId: string): Promise<User> {
    return await this.userRepos.findByID(userId);
  }

  public async findUserByPhone(phone_number: string): Promise<User> {
    return await this.userRepos.getUser({ phone_number: phone_number });
  }

  public async verifyToken(token: string): Promise<any> {
    const verifyToken = jwtRe.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, data) => {
        if (err) {
          return false;
        }
        return jwtRe.decode(token);
      },
    );

    return verifyToken;
  }

  public async getOfflineTimeByUser(
    user_id: string,
    timeNow: Date,
  ): Promise<Date> {
    const user: User = await this.userRepos.findByID(user_id);
    // have to subtract 8 hours to return right value
    const offlineTime =
      timeNow.valueOf() - user.disconnected_time.getTime() - 1000 * 60 * 60 * 8;
    const date = new Date(offlineTime);
    return date;
  }

  public async createNewPub(accessToken, newUser_BC): Promise<any> {
    try {
      const decodeToken = await this.verifyToken(accessToken);
      const userId = (await decodeToken)['user_id'];
      console.log(userId);

      const result = await this.blockchainConnectionService.createUser(
        userId,
        newUser_BC,
      );

      if (!result) return 'Can not save public key!';

      return 'Save public key successfully!';
    } catch (error) {
      console.log('error at createNewPub');
      return {
        message: 'error at createNewPub',
        error: error,
      };
    }
  }

  public async getPubKeyUser(phoneNumber): Promise<any> {
    try {
      const user = await this.userRepository.getUser({
        phone_number: phoneNumber,
      });

      if (!user) return 'Can not find this phone number!!!';

      const publicKey = await this.blockchainConnectionService.getPubKeyUser(
        user._id.toString(),
      );

      return {
        publicKey: publicKey,
      };
    } catch (error) {
      console.log('error at getPubKeyUser');

      return {
        message: 'error at getPubKeyUser',
        error: error,
      };
    }
  }

  public async getPubKeyUserID(userID): Promise<any> {
    try {
      const publicKey = await this.blockchainConnectionService.getPubKeyUser(
        userID.toString(),
      );

      return {
        publicKey: publicKey,
      };
    } catch (error) {
      console.log('error at getPubKeyUser');
      return {
        message: 'error at getPubKeyUser',
        error: error,
      };
    }
  }

  public async getPubKeyRoomId(accessToken, roomID): Promise<any> {
    try {
      let anotherUserId;

      const decodeToken = await this.verifyToken(accessToken);
      const userId = (await decodeToken)['user_id'];
      console.log(userId);

      // get room
      const chatRoom = this.chatRoomService.getChatRoomById(roomID);

      if (!chatRoom) return 'Can not find the room';

      (await chatRoom).participants.map((user) => {
        if (user._id.toString() !== userId.toString()) {
          anotherUserId = user._id.toString();
        }
      });

      // get another public key
      const publicKey = await this.blockchainConnectionService.getPubKeyUser(
        anotherUserId,
      );

      return {
        publicKey: publicKey,
      };
    } catch (error) {
      console.log('error at getPubKeyUser');
      return {
        message: 'error at getPubKeyUser',
        error: error,
      };
    }
  }
}
