import React from "react";
import { Link } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import useLogin from "../hooks/user-login";

const ActionButton = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { isLoggedIn, login, logout } = useLogin();

  if (!account) {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={() => activateBrowserWallet()}
      >
        Connect Wallet
      </button>
    );
  }

  if (!isLoggedIn) {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={login}
      >
        Login
      </button>
    );
  }

  return (
    <>
      <Link to="new">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Write
        </button>
      </Link>
      <button
        className="ml-2 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

const Header: React.FC = () => {
  return (
    <div className="flex pt-4 pb-2 items-center">
      <div className="flex-1 text-3xl  font-semibold">DeBlog</div>
      <div className="justify-end">
        <ActionButton />
      </div>
    </div>
  );
};

export default Header;
