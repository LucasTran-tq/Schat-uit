import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
/* Provider handle send SMS */
export class TwilioServices {
  public constructor(@InjectTwilio() private readonly client: TwilioClient) {}
  public async sendSMS(phoneNumber: string, OTP: Number) {
    try {
      return await this.client.messages.create({
        body: OTP.toString(),
        messagingServiceSid: process.env.MESSAGING_SERVICE,
        to: phoneNumber,
      });
    } catch (e) {
      return e;
    }
  }
}
