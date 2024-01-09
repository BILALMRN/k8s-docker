import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { AdminEntity } from "../../Model/AdminEntity";

dotenv.config();

const migrationsPath = "./*Table.ts";
const databaseUrl = process.env.CONNECTION_STRING_POSTGRES_SQL;

if (!databaseUrl) {
  throw new Error("Database connection string not found in environment variables");
}

export const dataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  entities: [AdminEntity],
  migrations: [migrationsPath],
  synchronize: true,
  logging: true,
});
