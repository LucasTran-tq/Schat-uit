import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public static async removeAccents(str: string): Promise<string> {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }
}
