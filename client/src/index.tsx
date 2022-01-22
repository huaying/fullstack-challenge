import React from "react";
import { render } from "react-dom";
import { Mainnet, DAppProvider, useEthers, Config } from "@usedapp/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  useCreateLoginNonceMutation,
  useLoginMutation,
} from "./generated/graphql";

const dappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  },
};

const apolloClient = new ApolloClient({
  uri: "http://localhost:8080/",
  cache: new InMemoryCache(),
});

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
      const token = await loginMutation({ variables: { userId, signature } });
      console.log("token", token.data);
    }
  };

  return <button onClick={() => sign()}>Login</button>;
};

export function App(): React.ReactElement {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <div>
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
    </div>
  );
}
render(
  <ApolloProvider client={apolloClient}>
    <DAppProvider config={dappConfig}>
      <App />
    </DAppProvider>
  </ApolloProvider>,
  document.getElementById("app")
);
