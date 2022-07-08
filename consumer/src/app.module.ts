import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'deep_dark',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'deep_dark_client',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'deep_dark_group',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
