import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { router } from "./app/modules/routes/route";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from tour management system backend",
  });
});

export default app;
