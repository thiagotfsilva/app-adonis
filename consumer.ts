import { Connection, Channel, connect, Message } from 'amqplib'

export class RabittMqConsumer {
  private conn: Connection
  private channel: Channel

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  async consume(queue: string, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      if (message) {
        callback(message)
        this.channel.ack(message)
      }
    })
  }
}
