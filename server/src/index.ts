require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs, context } from "./graphql";

import {
  TimestampResolver,
  TimestampTypeDefinition,
  JWTResolver,
  JWTDefinition,
} from "graphql-scalars";

// init server
const server = new ApolloServer({
  cors: {
    origin: "*", // for demo purpose
  },
  dataSources: () => ({}),
  debug: true,
  typeDefs: [TimestampTypeDefinition, JWTDefinition, typeDefs],
  resolvers: {
    Timestamp: TimestampResolver,
    JWT: JWTResolver,
    ...resolvers,
  },
  context,
});

// run server up
server
  .listen({ port: 8080 })
  .then(({ url }) => console.log(`Server is ready at ${url}`));
