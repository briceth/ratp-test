import { Request, Response } from "express";

import * as searchProcess from "./process";

export const search = async (req: Request, res: Response) => {
  const { q, sort, rows, start } = req.query;

  const params = { q, sort, rows, start } as searchProcess.Params;

  const result = await searchProcess.search(params);

  res.json(result);
};
