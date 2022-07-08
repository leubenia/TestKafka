import { DynamicModule, Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaConfig } from './kafka.message';
import { KafkaService } from './kafka.service';

@Module({
  imports: [KafkaModule],
  controllers: [KafkaController],
})
export class KafkaModule {
  static register(kafkaConfig: KafkaConfig): DynamicModule {
    return {
      global: true,
      module: KafkaModule,
      providers: [
        {
          provide: KafkaService,
          useValue: new KafkaService(kafkaConfig),
        },
      ],
      exports: [KafkaService],
    };
  }
}
