import express, { Express } from "express";
import { BusinessRouter } from "./api/business.controller";

export default function initServer() {
  const app = express();

  initControllers(app);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}...`);
  });
}

function initControllers(app: Express) {
  app.use("/business", BusinessRouter);
}
