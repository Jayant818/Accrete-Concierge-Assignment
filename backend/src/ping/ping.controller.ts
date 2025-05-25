import { Body, Controller, Get, Post } from '@nestjs/common';
import { sendMessageDTO } from './DTO/send-message.dto';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get()
  Ping() {
    return 'Hello';
  }

  @Post()
  async sendMessage(@Body() messageData: sendMessageDTO) {
    return await this.pingService.processMessage(messageData);
  }
}
