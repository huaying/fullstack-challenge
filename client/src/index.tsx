import React from "react";
import { render } from "react-dom";
import { Mainnet, DAppProvider, useEthers, Config } from "@usedapp/core";
import { ApolloProvider, apolloClient } from "./apollo-client";
import { BrowserRouter } from "react-router-dom";
import {
  useCreateLoginNonceMutation,
  useLoginMutation,
  useArticlesQuery,
  Article,
} from "./generated/graphql";
import App from "./app";
import "./index.css";

const dappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  },
};

const Login: React.FC<{ userId: string }> = ({ userId }) => {
  const { library } = useEthers();
  const [createLoginNonceMutation] = useCreateLoginNonceMutation();
  const [loginMutation] = useLoginMutation();

  const sign = async () => {
    const result = await createLoginNonceMutation({ variables: { userId } });
    const nonce = result.data?.createLoginNonce;
    // add prefix `authentication code:`
    const signature = await library
      ?.getSigner()
      .signMessage(`authentication code: ${nonce}`);

    console.log(nonce, userId, signature);
    if (signature) {
      const token = await loginMutation({
        variables: { userId, signature },
      });

      localStorage.setItem("token", token.data?.login);
    }
  };

  return <button onClick={() => sign()}>Login</button>;
};

const Articles: React.FC = () => {
  const { data, loading, error } = useArticlesQuery();
  if (loading || error) return null;

  return (
    <>
      {data?.articles &&
        data?.articles.map(
          (article: Article): JSX.Element => (
            <div key={article.id}>
              <div>{article.id}</div>
              <div>{article.title}</div>
              <div>{article.content}</div>
              <div>{article.createdAt}</div>
            </div>
          )
        )}
    </>
  );
};

export function App2(): React.ReactElement {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <div className="bg-slate-50">
      <div>
        {!account && (
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        )}
      </div>
      {account && (
        <>
          <p>Account: {account}</p>
          <Login userId={account} />
        </>
      )}
      <Articles />
    </div>
  );
}
render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <DAppProvider config={dappConfig}>
        <App />
      </DAppProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("app")
);
