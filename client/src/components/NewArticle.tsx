import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateArticleMutation,
  ArticlesDocument,
  ArticlesQuery,
  Maybe,
} from "../generated/graphql";

const NewArticle: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [createArticleMutation, { loading }] = useCreateArticleMutation({
    variables: {
      title,
      content,
    },
    update: (cache, { data }) => {
      const result: Maybe<ArticlesQuery> = cache.readQuery({
        query: ArticlesDocument,
      });
      if (result?.articles) {
        cache.writeQuery({
          query: ArticlesDocument,
          data: {
            ...result,
            articles: [data?.createArticle, ...result.articles],
          },
        });
      }
    },
  });

  const submitArticle = async () => {
    setErrorMsg("");
    if (!title) {
      setErrorMsg("Title is empty");
    } else if (!content) {
      setErrorMsg("Content is empty");
    } else {
      await createArticleMutation();
      navigate(`/`);
    }
  };

  return (
    <form className="pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight h-44 focus:outline-none focus:shadow-outline"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>
      {loading ? (
        <div>Submitting...</div>
      ) : (
        <div className="flex items-center">
          <Link to="/">
            <button
              className="bg-transparent hover:bg-slate-300 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded"
              type="button"
            >
              Cancel
            </button>
          </Link>
          <button
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={submitArticle}
          >
            Submit
          </button>
          {errorMsg && (
            <p className="text-red-500 italic ml-auto">{errorMsg}</p>
          )}
        </div>
      )}
    </form>
  );
};

export default NewArticle;
