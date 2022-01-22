import { Mainnet, DAppProvider, useEthers, Config } from "@usedapp/core";
import React from "react";
import { render } from "react-dom";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  },
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
      {account && <p>Account: {account}</p>}
    </div>
  );
}
render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById("app")
);
