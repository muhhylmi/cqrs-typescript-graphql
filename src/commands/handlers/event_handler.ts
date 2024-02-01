import elasticConnection from "../../helpers/db/elasticsearch"
import { registerRabbitMq } from "../../helpers/rabbitmq/instance"
import RabbitMq from "../../helpers/rabbitmq/rabbitmq"
import UseCase from "../use_case/use_case"

class UserEventHandler {
    private rabbitMq: RabbitMq
    private command: UseCase
  
    constructor(){
      this.rabbitMq = new RabbitMq()
      this.command = new UseCase()
      registerRabbitMq(this.rabbitMq)
    }
  
    registerQueueUserCreated() {
      this.rabbitMq.registerQueue("user-created", this.command.createUserEvent)
    }
}

export default UserEventHandler