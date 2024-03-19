import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { sucess: boolean; message: string } {
    return { sucess: true, message: 'Application is running' };
  }
}
