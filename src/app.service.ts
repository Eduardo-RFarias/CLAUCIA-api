import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): { message: string } {
    this.logger.debug('Hello World');
    return { message: 'Hello World' };
  }
}
