import { Router } from "express";

import user from "./routes/user";
import post from "./routes/post";
import auth from "./routes/auth";

export default () => {
  const app = Router();

  auth(app);
  user(app);
  post(app);

  return app;
};
