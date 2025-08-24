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

    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });

    // at this point the code is pretty similar to the sender

    // consume the message
    console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);
    channel.consume(
      queue,
      (msg) => {
        console.log(` [x] received ${msg?.content.toString()}`);
      },
      {
        // noAck is used to acknowledge the message
        noAck: true
      }
    );
  });
});
