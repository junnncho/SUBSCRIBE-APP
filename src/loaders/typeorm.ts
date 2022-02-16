import { createConnection, Connection } from "typeorm";

import config from "@/config";
import Logger from "./logger";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export default async (): Promise<Connection> => {
  const connectionOptions = config.db as MysqlConnectionOptions;
  const connection = await createConnection(connectionOptions);

  Logger.info(`db connected on port: ${connectionOptions.port}`);

  return connection;
};
