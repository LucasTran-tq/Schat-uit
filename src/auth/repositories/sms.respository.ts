import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sms, SmsDocument } from '../schemas/sms.schema';
import { Model, FilterQuery } from 'mongoose';

/* Provider SmsModel */
@Injectable()
export class SmsRespository {
  constructor(@InjectModel(Sms.name) private smsModel: Model<SmsDocument>) {}

  //Create and import data into mongodb
  public async smsRequire(smsRequire: Sms): Promise<Sms> {
    const newSms =  new this.smsModel(smsRequire);
    return await newSms.save();
  }

  public async smsVerification(
    smsVerificationData: FilterQuery<Sms>,
  ): Promise<Sms> {
    return this.smsModel.findOne(smsVerificationData);
  }

  public async smsDelete(smsDeleteData: FilterQuery<Sms>): Promise<Sms> {
    return this.smsModel.findOneAndDelete(smsDeleteData);
  }
}
