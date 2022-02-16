import express from "express";
import cors from "cors";
import morgan, { StreamOptions } from "morgan";
import routes from "@/api";
import config from "@/config";
import Logger from "@/loaders/logger";
import { nextTick } from "process";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const stream: StreamOptions = {
    write: msg => Logger.http(msg.substring(0, msg.lastIndexOf("\n")))
  };
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms", {
      stream
    })
  );

  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }

    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status ?? 500);
    res.json({ errors: { message: err } });
  });
};
