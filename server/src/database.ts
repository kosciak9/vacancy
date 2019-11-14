import "reflect-metadata";

import * as TypeORM from "typeorm";

import { Container } from "typedi";
import entities from "entities";
import { seedDatabase } from "helpers";

const DB_HOST = process.env.DB_HOST || "vacancy-db";
const DB_NAME = process.env.DB_NAME || "vacancy";
const DB_USER = process.env.DB_USER || "vacancy";
const DB_PASS = process.env.DB_PASS || "hunter2";

TypeORM.useContainer(Container);

export default async cabin => {
  try {
    // create TypeORM connection
    await TypeORM.createConnection({
      type: "sqlite",
      // host: DB_HOST,
      database: DB_NAME,
      // username: DB_USER,
      // password: DB_PASS,
      // port: 5432,
      entities,
      synchronize: true,
      // logger: "advanced-console",
      logger: "simple-console",
      // logging: "",
      dropSchema: true,
      cache: true
    });

    if (process.env.NODE_ENV !== "production") {
      await seedDatabase();
    }
  } catch (error) {
    cabin.fatal(error);
  }
};
