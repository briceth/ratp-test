import { Request, Response, NextFunction } from "express";

interface HttpError extends Error {
  status: number;
}

export function errorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error handler middleware:", error);

  res.status(error.status).json({ error: error.message });
}
