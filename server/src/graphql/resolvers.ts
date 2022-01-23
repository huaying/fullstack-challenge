import articleStore from "../store/ArticleStore";
import auth from "../auth";

// userId in the resolvers means a user's address
const resolvers = {
  Query: {
    isLoggedIn: async (_, __, { userId }) => {
      return !!userId;
    },
    articles: async (_, __, { userId }) => {
      if (!userId) return null;

      return articleStore.getAll(userId);
    },
    article: async (_, { articleId }, { userId }) => {
      if (!userId) return null;

      return articleStore.get(userId, articleId);
    },
  },
  Mutation: {
    createLoginNonce: async (_, { userId }) => {
      return auth.generateNonce(userId);
    },
    login: async (_, { userId, signature }) => {
      return auth.loginUser(userId, signature);
    },
    createArticle: async (_, { title, content }, { userId }) => {
      if (!userId) return null;

      return articleStore.create({ userId, title, content });
    },
  },
};

export default resolvers;
