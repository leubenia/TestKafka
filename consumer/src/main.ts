import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ['localhost:29092'],
  //       },
  //     },
  //   },
  // );
  const app = await NestFactory.create(AppModule);

  await app.listen(3001, () => {
    console.log('serverStart');
  });
}
bootstrap();
