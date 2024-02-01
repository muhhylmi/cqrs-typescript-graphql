import { Client } from "@elastic/elasticsearch";

class Elastic {
    static client: Client

    constructor() {}

    connect(){
        try {
            Elastic.client = new Client({ 
                node: process.env.ELASTIC_URI,
                auth:{
                    username: process.env.ELASTIC_USERNAME || "",
                    password: process.env.ELASTIC_PASSWORD || ""
                },
                ssl: {
                    rejectUnauthorized: false
                }
            });
            
            console.log("✅ ELastic started successfully");
        } catch (error) {
            console.error(error);
        }

    }

    getClient() {
        return Elastic.client;
    }
}

export default Elastic;