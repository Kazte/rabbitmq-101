// this is our message consumer file (receiver)

import amqplib from 'amqplib/callback_api';
import { rabbitmqServer } from './config';

amqplib.connect(rabbitmqServer, (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel((errChan, channel) => {
    if (errChan) {
      throw errChan;
    }

    var queue = 'task_queue';

    channel.assertQueue(queue, {
      durable: true
    });

    // at this point the code is pretty similar to the sender

    // consume the message
    console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);
    channel.consume(
      queue,
      (msg) => {
        var sleepFor = msg!.content.toString().split('.').length - 1;

        console.log(` [x] received ${msg?.content.toString()}`);

        setTimeout(() => {
          console.log(` [x] done`);
        }, sleepFor * 1000);
      },
      {
        // noAck is used to acknowledge the message
        // see /docs/confirms for details
        noAck: true
      }
    );
  });
});
