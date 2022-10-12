import { Request, Router, Response, NextFunction } from "express";
import { InvalidBusinessIdError } from "../types/business.types";
import * as BusinessService from "../services/business.service";
import * as UpstreamService from "../services/upstream.service";

const BusinessRouter = Router();

BusinessRouter.get(
  "/random",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = UpstreamService.getRandomBusinessesId();
      const business = await BusinessService.getBusiness(id);
      res.json(business);
    } catch (err) {
      next(err);
    }
  }
);

BusinessRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const business = await BusinessService.getBusiness(id);
      res.json(business);
    } catch (err) {
      if (err instanceof InvalidBusinessIdError) {
        res.status(404).json(err.message);
      } else {
        next(err);
      }
    }
  }
);

export { BusinessRouter };
