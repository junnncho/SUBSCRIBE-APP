import "reflect-metadata";
import express from "express";

import config from "@/config";
import Logger from "@/loaders/logger";

async function startServer() {
  const expressApp = express();

  await require("./loaders").default({ expressApp });

  expressApp
    .listen(config.httpPort, () => {
      Logger.info(`Server listening on port: ${config.httpPort}`);
    })
    .on("error", err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
