import { app } from "./app.ts";
import { closeExpressPool } from "./config/db.ts";

const PORT = Number(process.env.EXPRESS_PORT || 4000);

const server = app.listen(PORT, () => {
  console.log(`[FigureMint Express API] Running on http://localhost:${PORT}/api/v1`);
});

const shutdown = async (signal: string) => {
  console.log(`[FigureMint Express API] ${signal} received, closing gracefully...`);
  server.close(async () => {
    await closeExpressPool();
    process.exit(0);
  });
};

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

