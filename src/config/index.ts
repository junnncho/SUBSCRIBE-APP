import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV ?? "development";

const env = dotenv.config();
if (env.error) {
  throw new Error("!!!!! Failed to find .env file !!!!!");
}

import { connectionOptions } from "./ormconfig";

export default {
  httpPort: Number(process.env.HTTP_PORT),
  db: connectionOptions,
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    jwtExpire: process.env.TOKEN_EXPIRE
  },
  logs: {
    level: process.env.LOG_LEVEL ?? "silly"
  },
  api: {
    prefix: "/api"
  }
};
