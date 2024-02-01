import RabbitMq from "../helpers/rabbitmq/rabbitmq";
import UserHandler from "./handlers/event_handler";
import { getRegisteredRmqInstances } from "../helpers/rabbitmq/instance";
const userHandler = new UserHandler()

const initEvent = async () => {
    console.log('info', 'consumer is Running...', 'initEvent');
    userHandler.registerQueueUserCreated();

    getRegisteredRmqInstances().forEach((rabbitMq: RabbitMq) => rabbitMq.consumeMessage());
    

    process.on('unhandledRejection', (reason, p) => {
        p.catch(err => {
          console.log('initEvent', JSON.stringify(err.stack), `event listener: ${reason}`);
        });
    });
}

export default initEvent