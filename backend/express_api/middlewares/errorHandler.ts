import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError || process.env.NODE_ENV !== "production"
      ? err.message
      : "Internal Server Error";

  res.status(statusCode).json({
    ok: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

