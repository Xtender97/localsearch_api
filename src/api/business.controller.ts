import { Request, Router, Response, NextFunction } from "express";
import { InvalidBusinessIdError } from "../models/business.model";
import * as BusinessService from "../services/business.service";

const BusinessRouter = Router();

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
