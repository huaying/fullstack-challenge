import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="flex pt-4 pb-2 items-center">
      <div className="flex-1 text-3xl  font-semibold">DeBlog</div>
      <div className="justify-end">
        <Link to="new">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Write
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
