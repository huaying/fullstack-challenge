import React from "react";
import { useArticlesQuery, Article as ArticleType } from "../generated/graphql";
import { useEthers } from "@usedapp/core";
import useLogin from "../hooks/user-login";

const Article: React.FC<{ article: ArticleType }> = ({ article }) => {
  return (
    <div className="border border-slate-100 border-solid rounded py-2 px-4 my-4 shadow">
      <h2 className="text-xl py-1">{article.title}</h2>
      <p className="text-base py-1">{article.content}</p>
    </div>
  );
};

const Articles: React.FC = () => {
  const { data, loading, error } = useArticlesQuery();
  if (loading || error) return null;
  return (
    <div>
      {data?.articles &&
        data?.articles.map(
          (article): JSX.Element => (
            <Article key={article.id} article={article} />
          )
        )}
    </div>
  );
};

const Home: React.FC = () => {
  const { account } = useEthers();
  const { isLoggedIn } = useLogin();

  if (!account) return null;

  return (
    <div>
      <div className="text-slate-500 font-medium text-sm text-center my-8">
        MY ADDRESS: {account}
      </div>
      {isLoggedIn && <Articles />}
    </div>
  );
};

export default Home;
