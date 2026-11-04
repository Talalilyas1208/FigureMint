import { Router } from "express";
import {
  ContactReportSchema,
  SavedScenarioSchema,
} from "../../../src/lib/security/sanitize.ts";
import {
  getCalculators,
  getHealth,
  postContact,
  postScenario,
} from "../controllers/figureController.ts";
import { rateLimitMiddleware, validateBody } from "../middlewares/security.ts";

export const v1Router = Router();

v1Router.get("/health", getHealth);

v1Router.get("/calculators", rateLimitMiddleware(60, 60_000), getCalculators);

v1Router.post(
  "/scenarios",
  rateLimitMiddleware(20, 60_000),
  validateBody(SavedScenarioSchema),
  postScenario
);

v1Router.post(
  "/contact",
  rateLimitMiddleware(10, 60_000),
  validateBody(ContactReportSchema),
  postContact
);

