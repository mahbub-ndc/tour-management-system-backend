import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { router } from "./app/modules/routes/route";
import { globalErrorHandler } from "./app/middlwares/globalErrorHandler";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from tour management system backend",
  });
});

app.use(globalErrorHandler);

export default app;
