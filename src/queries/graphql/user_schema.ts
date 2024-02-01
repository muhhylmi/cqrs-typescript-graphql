// schema.ts
import { makeExecutableSchema } from '@graphql-tools/schema';
import userResolver from '../handlers/user_handler';

const typeDefs = `
  type User {
    name: String!
    email: String!
    # ... other fields
  }

  type Query {
    users: [User]!
    # ... other queries
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: userResolver,
});

export default schema;
