require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { TimestampResolver, TimestampTypeDefinition } from "graphql-scalars";

// init server
const server = new ApolloServer({
  cors: {
    origin: [],
  },
  dataSources: () => ({}),
  debug: true,
  schema: makeExecutableSchema({
    typeDefs: [TimestampTypeDefinition, typeDefs],
    resolvers: {
      Timestamp: TimestampResolver,
      ...resolvers,
    },
  }),
});

// run server up
server
  .listen({ port: 8080 })
  .then(({ url }) => console.log(`Server is ready at ${url}`));
