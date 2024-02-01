// server.ts
import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import queriSchema from './queries/graphql/user_schema';
import connectDB from './helpers/db/mongodb';
import RabbitMq from './helpers/rabbitmq/rabbitmq';
import initEvent from './commands/event';
import Elastic from './helpers/db/elasticsearch';
import UserHandler from "./commands/routes/user_routes";
require('dotenv').config();

class App {
  public app: Application

  constructor() {
    this.app = express();
    this.plugins();
    this.mongoDbSync();
    this.graphql();
    this.connectElastic()
    this.rabbitmqSync()
    this.consumerSync();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected mongoDbSync(): void {
    connectDB();
  }

  protected rabbitmqSync(): void{
    new RabbitMq().createConnection()
  }
  
  protected connectElastic(): void {
    new Elastic().connect()
  }

  protected consumerSync(): void {
    initEvent()
  }

  protected graphql(): void {
    this.app.use(
      '/graphql/user/queries',
      graphqlHTTP({
        schema: queriSchema,
        graphiql: true, // Enable GraphiQL for testing in the browser
      })
    )
  }

  protected routes(): void {
    this.app.use("/api/v1/users", UserHandler);
  }

}

const port: number | string = process.env.PORT || 3000;;
const app = new App().app;

app.listen(port, () => {
  console.log("✅ Server started successfully on port:", port);
});