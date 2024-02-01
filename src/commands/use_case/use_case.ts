import Elastic from "../../helpers/db/elasticsearch";
import RabbitMq from "../../helpers/rabbitmq/rabbitmq";
import UserModel from "../models/user_model";

class UseCase {
    private rabbitMq: RabbitMq
    constructor() {
        this.rabbitMq = new RabbitMq()
    }

    async createUser(payload: any) {
        const newUser = new UserModel(payload);
        const result = await newUser.save();

        this.rabbitMq.publishMessage("user-created", JSON.stringify(payload))
        return result;
    }


    async createUserEvent(payload: any) {
        try {
            const data = JSON.parse(payload)
            const document = {
                username: data.name,
                email: data.email
            }                        

            await Elastic.client.index({
                index: "users",
                body: document
            })
            return true;
        } catch (error) {
            console.error(error)
            return false
        }
        
    }
}

export default UseCase;