import { Request, Router, Response } from "express";

const BusinessRouter = Router();

BusinessRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(id);
});

export { BusinessRouter };
