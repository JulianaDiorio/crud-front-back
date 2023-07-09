import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
  const dbUrl: string | undefined = process.env.DATABASE_URL;
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [User],
    };
  }

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }

  // if (process.env.DB_IN_USE === "mongo") {
  //   return {
  //     type: "mongodb",
  //     url: process.env.DATABASE_MONGO_URL,
  //     synchronize: false,
  //     logging: false,
  //     entities: [User],
  //     migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
  //   };
  // }

  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
