import { Injectable } from '@nestjs/common';
import { SubscribeTo, SubscribeToFixedGroup } from '../kafka/kafka.decorator';
import { KafkaPayload } from '../kafka/kafka.message';

@Injectable()
export class ConsumerService {
  /**
   * When group id is unique for every container.
   * @param payload
   */
  @SubscribeTo('hello.topic')
  helloSubscriber(payload: KafkaPayload) {
    console.log('여기면 한개 더찍히겟지요..!');

    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
  }

  /**
   * When application or container scale up &
   * consumer group id is same for application
   * @param payload
   */
  @SubscribeToFixedGroup('deep.dark.fixed')
  helloSubscriberToFixedGroup(payload: KafkaPayload) {
    // console.log(
    //   '[KAKFA-CONSUMER] Print message after receiving for fixed group',
    //   payload,
    // );
    console.log('여기는 그냥 도착만 찍어본다고요..');
  }

  /**
   * When group id is unique for every container.
   * @param payload
   */
  @SubscribeTo('deep.dark')
  helloSubscriber2(payload: KafkaPayload) {
    console.log('여기가 디이이입 다크~');

    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
  }
}
