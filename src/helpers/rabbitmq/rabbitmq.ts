import * as amqp from 'amqplib';

class RabbitMq {
    static connection: amqp.Connection | undefined
    private queue: Record<string, Function> = {}   

    constructor() {
        this.queue = {}
    }

    async createConnection(){
        const rmqUri: string = process.env.RMQ_URI || ""
        const connection = await amqp.connect(rmqUri);
        if (!connection) {
            console.log("rabbitmq failed connect")
        }
        RabbitMq.connection = connection

        return RabbitMq.connection;
    }

    async publishMessage(queueName: string, message: any) {
        let connection = RabbitMq.connection;
        if (!connection) {
            connection = await this.createConnection()
        }
        const channel = await connection.createChannel();
      
        await channel.assertQueue(queueName);
        channel.sendToQueue(queueName, Buffer.from(message));
      
        console.log(`Message sent: ${message}`);
    }

    registerQueue(queueName: string, handler: Function) {
        this.queue[queueName] = handler;
    }

    async consumeMessage() {
        let connection = RabbitMq.connection;
        if (!connection) {
            connection = await this.createConnection()
        }        
        const channel = await connection.createChannel();

        for (const queueName of  Object.keys(this.queue)){
            await channel.assertQueue(queueName);
            channel.consume(queueName, async (msg) => {
              if (msg) {
                const message = msg.content.toString();
                console.log(`Received message: ${message}`);
                const result = await this.queue[queueName](message)
                if (!result) {
                    console.error("error consume queue", queueName)
                } else {
                    channel.ack(msg)
                    console.log("success consume queue", queueName)
                }
              }
            });
        }
        console.log('Waiting for messages...');
      }
}

export default RabbitMq;