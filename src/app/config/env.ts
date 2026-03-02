import dotenv from "dotenv";
dotenv.config();

export const environment = {
  port: process.env.PORT || 3000,
  db_url: process.env.DB_URL,
  node_env: process.env.NODE_ENV,
};
