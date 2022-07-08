import { Injectable } from '@nestjs/common';
import { KafkaPayload } from './module/kafka/kafka.message';
import { KafkaService } from './module/kafka/kafka.service';

@Injectable()
export class AppService {
  constructor(private readonly kafkaService: KafkaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async send() {
    const message = {
      value: 'Message send to Kakfa Topic',
    };
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: message,
      messageType: 'Say.Hello',
      topicName: 'deep.dark',
    };
    const value = await this.kafkaService.sendMessage('deep.dark', payload);
    console.log('kafka status ', value);
    return message;
  }

  async sendToFixedConsumer() {
    const message = {
      value: 'Message send to Kakfa Topic',
    };
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: message,
      messageType: 'Say.Hello',
      topicName: 'deep.dark.fixed', // topic name could be any name
    };
    const value = await this.kafkaService.sendMessage(
      'deep.dark.fixed',
      payload,
    );
    console.log('kafka status ', value);
    return message;
  }
}
