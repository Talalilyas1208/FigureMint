import type { Request, Response, NextFunction, RequestHandler } from "express";
import helmet from "helmet";
import cors from "cors";
import type { ZodType } from "zod";
import { AppError } from "../utils/AppError.ts";

export const securityHeaders = helmet();

export const corsMiddleware = cors({
  origin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(",").map((o) => o.trim()),
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
});

const ipWindows = new Map<string, number[]>();

export function rateLimitMiddleware(maxHits = 45, windowMs = 60_000): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const rawIp = (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() || req.ip || "local";
    const now = Date.now();
    const recent = (ipWindows.get(rawIp) || []).filter((ts) => now - ts < windowMs);

    if (recent.length >= maxHits) {
      res.setHeader("Retry-After", "30");
      next(new AppError("Too many requests. Please try again shortly.", 429));
      return;
    }

    recent.push(now);
    ipWindows.set(rawIp, recent);
    next();
  };
}

export function validateBody<T>(schema: ZodType<T>): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Request validation failed.";
      next(new AppError(msg, 422));
      return;
    }
    req.body = parsed.data;
    next();
  };
}

