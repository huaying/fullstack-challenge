import React from "react";
import { useEthers } from "@usedapp/core";
import {
  useIsLoggedInQuery,
  useLoginMutation,
  useCreateLoginNonceMutation,
} from "../generated/graphql";

const useLogin = () => {
  const { library, account } = useEthers();
  const [createLoginNonceMutation] = useCreateLoginNonceMutation();
  const [loginMutation] = useLoginMutation();
  const { data } = useIsLoggedInQuery();
  const isLoggedIn = !!data?.isLoggedIn && !!account;

  const login = React.useCallback(async () => {
    if (!account) {
      throw "Not connected to your wallet yet.";
    }

    const result = await createLoginNonceMutation({
      variables: { userId: account },
    });
    const nonce = result.data?.createLoginNonce;

    // add prefix `authentication code:`
    const signature = await library
      ?.getSigner()
      .signMessage(`authentication code: ${nonce}`);

    if (signature) {
      const token = await loginMutation({
        variables: { userId: account, signature },
      });

      localStorage.setItem("token", token.data?.login);
      location.reload();
    }
  }, [library, account]);

  const logout = async () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return { isLoggedIn, login, logout };
};

export default useLogin;
