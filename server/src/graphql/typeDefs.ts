import { gql } from "apollo-server";

const typeDefs = gql`
  type Article {
    id: ID
    title: String
    content: String
    createdAt: Timestamp
  }

  type Query {
    isLoggedIn: Boolean
    articles: [Article!]
    article(articleId: ID!): Article
  }

  type Mutation {
    createLoginNonce(userId: ID!): String
    login(userId: ID!, signature: String!): JWT
    createArticle(title: String!, content: String!): Article
  }
`;

export default typeDefs;
