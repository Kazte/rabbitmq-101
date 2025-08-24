// this is our message publisher file (sender)
import amqplib from 'amqplib/callback_api';
import { rabbitmqServer } from './config';

// then connect to the rabbitmq server
amqplib.connect(rabbitmqServer, (err, connection) => {
  // check if there is an error
  if (err) {
    throw err;
  }

  // otherwise lets create a channel, which is where most of the API fot getting things done resides
  connection.createChannel((errChan, channel) => {
    // to send, we must declare a queue to send to
    // when we can publish a message to the queue

    var queue = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || 'new task';

    // assertQueue is used to create a queue if it doesn't exist
    channel.assertQueue(queue, {
      // durable: true means that the queue will not be deleted when the server restarts
      durable: true
    });

    channel.sendToQueue(queue, Buffer.from(msg), {
      // persistent: true means that the message will not be lost if the server restarts
      persistent: true
    });

    // since the message content is a byte array, you can encode whatever you like

    console.log(` [x] sent ${msg}`);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
