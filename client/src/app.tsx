import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import NewArticle from "./components/NewArticle";

const App: React.FC = () => {
  return (
    <div className="container mx-auto max-w-screen-sm px-4 text-black font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewArticle />} />
      </Routes>
    </div>
  );
};

export default App;
