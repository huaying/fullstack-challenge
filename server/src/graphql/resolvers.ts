import ArticleStore from "../store/ArticleStore";

const articleStore = new ArticleStore();

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
    createArticle: async (_, { userId, title, content }) => {
      return articleStore.create({ userId, title, content });
    },
  },
};

export default resolvers;
