import { Controller, Inject } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('deep_dark') private readonly client: ClientKafka,
  ) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:29092'],
      },
    },
  })
  async onModuleInit() {
    ['deep.dark'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @MessagePattern('deep.dark')
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response =
      `Receiving a new message from topic: medium.rocks: ` +
      JSON.stringify(originalMessage.value);
    console.log(response);
    return response;
  }

  @MessagePattern('deep.dark.reply')
  readReMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response =
      `Receiving a new reply message from topic: medium.rocks: ` +
      JSON.stringify(originalMessage.value);
    console.log(response);
    return response;
  }
}
