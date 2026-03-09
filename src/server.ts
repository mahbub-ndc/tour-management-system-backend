/* eslint-disable no-console */
import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import { environment } from "./app/config/env";
import { superAdmin } from "./app/utils/superadmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(environment.db_url as string);
    console.log("DB connected");

    server = app.listen(environment.port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await superAdmin();
})();

process.on("unhandledRejection", (error) => {
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

//Promise.reject(new Error("DB failed"));

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});

process.on("SIGINT", () => {
  console.log("SIGINT is received...Server shutting down gracefully");
  if (server) {
    server.close();
  }
});
