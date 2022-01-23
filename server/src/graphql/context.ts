import auth from "../auth";

function context({ req }) {
  const token = req.headers.authorization || "";

  // API middleware to grab the authenticated user.
  const userId = auth.verifyAccessToken(token);

  // Add the user to the context
  return { userId };
}

export default context;
