import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // async onModuleInit() {
  //   ['deep.dark'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
  //   await this.client.connect();
  // }

  // async onModuleDestroy() {
  //   await this.client.close();
  // }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('kafka-test')
  // testKafka() {
  //   console.log('send message deepDark message...');

  //   return this.client.emit('deep.dark', {
  //     deep: 'dark',
  //     data: new Date().toString(),
  //   });
  // }

  // @Get('kafka-test-with-response')
  // testKafkaWithResponse() {
  //   console.log('send reply message deepDark message...');

  //   return this.client.send('deep.dark', {
  //     foo: 'bar',
  //     data: new Date().toString(),
  //   });
  // }

  // @MessagePattern('deep.dark')
  // readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
  //   const originalMessage = context.getMessage();
  //   const response =
  //     `Receiving a new message from topic: medium.rocks: ` +
  //     JSON.stringify(originalMessage.value);
  //   console.log(response);
  //   return response;
  // }

  @Get('/send')
  async send() {
    await this.appService.sendToFixedConsumer();
    return this.appService.send();
  }

  @Get('/send/consumer')
  async sendToConsumer() {
    return await this.appService.send();
  }

  @Get('/send/fixed-consumer')
  async sendToFixedConsumer() {
    return await this.appService.sendToFixedConsumer();
  }
}
