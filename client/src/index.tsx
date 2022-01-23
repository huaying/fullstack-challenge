import React from "react";
import { render } from "react-dom";
import { Mainnet, DAppProvider, Config } from "@usedapp/core";
import { ApolloProvider, apolloClient } from "./apollo-client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";

const dappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  },
};

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
