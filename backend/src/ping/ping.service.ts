import { Injectable, Logger } from '@nestjs/common';
import { sendMessageDTO } from './DTO/send-message.dto';

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  async processMessage(messageData: sendMessageDTO) {
    try {
      // Simulate async processing
      await this.simulateProcessing();

      this.logger.log(`Processed message from user ${messageData.user}`);

      return {
        ok: true,
        ts: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Error processing message: ${error.message}`);
      throw error;
    }
  }

  private async simulateProcessing(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
