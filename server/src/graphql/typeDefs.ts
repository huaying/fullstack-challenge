import { gql } from "apollo-server";

const typeDefs = gql`
  type Article {
    id: ID
    title: String
    content: String
    createdAt: Timestamp
  }

  type Query {
    articles(userId: ID): [Article]
    article(articleId: ID, userId: ID): Article
  }

  type Mutation {
    createArticle(userId: ID, title: String, content: String): Article
  }
`;

export default typeDefs;
