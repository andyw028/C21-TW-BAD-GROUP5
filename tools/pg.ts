import pg from "pg";
import dotenv from "dotenv";

export const dbUser = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });