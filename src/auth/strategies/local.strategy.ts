import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {SmsServices} from '../services/sms.service';
import { LoginDto } from '../dto/login.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private smsService: SmsServices) {
        super();
    }

    public async validate(loginDto: LoginDto): Promise<any>{
        const phoneNumber = await this.smsService.login(loginDto);
        if(!phoneNumber){
            throw new UnauthorizedException('Invalid phone number', 'login error');
        }
        return phoneNumber;
    }
    
}