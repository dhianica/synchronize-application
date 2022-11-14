import amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1
    }

    const queue = 'message-to-consumer2'

    channel.assertQueue(queue, {
      durable: true,
      autoDelete: true
    })

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue)

    channel.consume(queue, (msg) => {
      console.log(' [x] Received %s', msg.content.toString())
    }, {
      noAck: false,
    })
  })
})
