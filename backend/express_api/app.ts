import express from "express";
import { corsMiddleware, securityHeaders } from "./middlewares/security.ts";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.ts";
import { v1Router } from "./routes/v1Routes.ts";

export const app = express();

app.use(securityHeaders);
app.use(corsMiddleware);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1", v1Router);

app.use(notFoundHandler);
app.use(errorHandler);

