import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './module/kafka/kafka.module';
import { ConsumerModule } from './module/consumer/consumer.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'deep_dark',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'deep_dark_client',
    //         brokers: ['localhost:29092'],
    //       },
    //       consumer: {
    //         groupId: 'deep_dark_group',
    //       },
    //     },
    //   },
    // ]),
    KafkaModule.register({
      clientId: 'deep_dark_client',
      brokers: ['localhost:29092'],
      groupId: 'deep_dark_group',
    }),
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
