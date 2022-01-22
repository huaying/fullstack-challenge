import ArticleStore from "../store/ArticleStore";
import Auth from "../auth";

const articleStore = new ArticleStore();
const auth = new Auth();

// userId in the resolvers means a user's address
const resolvers = {
  Query: {
    articles: async (_, { userId }) => {
      return articleStore.getAll(userId);
    },
    article: async (_, { articleId, userId }) => {
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
    createArticle: async (_, { userId, title, content }) => {
      return articleStore.create({ userId, title, content });
    },
  },
};

export default resolvers;
