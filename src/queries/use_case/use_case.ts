import RabbitMq from "../../helpers/rabbitmq/rabbitmq";
import UserModel from "../../commands/models/user_model";
import Elastic from "../../helpers/db/elasticsearch";


class UseCase {
    private rabbitMq: RabbitMq

    constructor() {
        this.rabbitMq = new RabbitMq()
    }

    async findAll(){
        const { body } = await Elastic.client.search({
            index: "users",
        })
        if (!body) {
            return new Error("cannot get data")
        }
        const result = []
        for (const data of body.hits.hits){
            result.push({
                name: data._source.username,
                email: data._source.email
            })
        }
        
        return result
    }
}

export default UseCase;