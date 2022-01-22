import { create } from "ipfs-http-client";
import OrbitDB from "orbit-db";

class ArticleStore {
  db = null;

  private async getDB() {
    if (this.db !== null) {
      return this.db;
    }

    const ipfs = create({ url: "http://127.0.0.1:5002" });
    const orbitdb = await OrbitDB.createInstance(ipfs);

    this.db = orbitdb;
    return orbitdb;
  }

  private async getUserStore(userId) {
    const db = await this.getDB();
    const store = await db.feed(userId);
    await store.load();

    return store;
  }

  private getArticle(storeArticle) {
    return storeArticle
      ? {
          id: storeArticle.hash,
          ...storeArticle.payload.value,
        }
      : null;
  }

  async getAll(userId) {
    const store = await this.getUserStore(userId);

    return store
      .iterator({ limit: -1, reverse: true })
      .collect()
      .map(this.getArticle);
  }

  async get(userId, articleId) {
    const store = await this.getUserStore(userId);

    const article = this.getArticle(await store.get(articleId));

    // orbitdb bug: orbitdb returns the first obj if id doesn't exist,
    // so we have to verify the id after receiving the obj.
    return article && article.id === articleId ? article : null;
  }

  async create({ userId, title, content }) {
    const store = await this.getUserStore(userId);
    const articleId = await store.add({
      title,
      content,
      createdAt: Date.now(),
    });

    return this.get(userId, articleId);
  }
}

export default ArticleStore;
