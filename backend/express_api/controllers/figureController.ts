import type { Request, Response } from "express";
import {
  getCatalogService,
  saveContactService,
  saveScenarioService,
} from "../services/figureService.ts";
import { calculateService } from "../services/calcService.ts";

export async function getHealth(_req: Request, res: Response): Promise<void> {
  res.json({ ok: true, service: "figuremint-express-api", timestamp: new Date().toISOString() });
}

export async function getCalculators(_req: Request, res: Response): Promise<void> {
  const catalog = await getCatalogService();
  res.json(catalog);
}

export async function postCalculate(req: Request, res: Response): Promise<void> {
  const { slug, values } = req.body;
  if (!slug || typeof slug !== "string") {
    res.status(400).json({ ok: false, error: "Missing calculator slug." });
    return;
  }
  const result = await calculateService(slug, values || {});
  if (!result) {
    res.status(404).json({ ok: false, error: `Calculator '${slug}' not found.` });
    return;
  }
  res.json({ ok: true, slug, result, engineVersion: "2026.2-express" });
}

export async function postScenario(req: Request, res: Response): Promise<void> {
  const saved = await saveScenarioService(req.body);
  res.status(201).json({ ok: true, id: saved.id, persisted: saved.persisted });
}

export async function postContact(req: Request, res: Response): Promise<void> {
  const saved = await saveContactService(req.body);
  res.status(201).json({
    ok: true,
    ticketRef: saved.ticketRef,
    persistedToPostgres: saved.persisted,
  });
}

