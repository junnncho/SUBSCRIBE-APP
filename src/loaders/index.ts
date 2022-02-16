import expressLoader from "./express";
import ormLoader from "./typeorm";
import cronLoader from "./cron";
import Logger from "./logger";

export default async ({ expressApp }) => {
  Logger.info("Load start");
  await ormLoader();
  Logger.info("Orm loaded");

  cronLoader();
  Logger.info("Cron Loaded");

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
