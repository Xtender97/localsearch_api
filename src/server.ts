import express, { Express, Request, Response, NextFunction } from "express";
import { BusinessRouter } from "./api/business.controller";
import cors from "cors";

export default function initServer() {
  const app = express();

  app.use(cors());

  initControllers(app);

  initErrorHandler(app);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}...`);
  });
}

function initControllers(app: Express) {
  app.use("/business", BusinessRouter);
}

function initErrorHandler(app: Express) {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(500).end();
  });
}
