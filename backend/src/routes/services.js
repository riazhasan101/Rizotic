import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

// Simple in-memory cache — no Redis needed
let cache = { data: null, ts: 0 };
const TTL = 3600_000; // 1hr

router.get("/", async (_req, res) => {
  try {
    if (cache.data && Date.now() - cache.ts < TTL) return res.json(cache.data);
    const services = await prisma.service.findMany({ where:{ active:true }, orderBy:{ order:"asc" } });
    cache = { data: services, ts: Date.now() };
    res.json(services);
  } catch { res.status(500).json({ error:"Failed" }); }
});

router.get("/:slug", async (req, res) => {
  try {
    const s = await prisma.service.findUnique({ where:{ slug:req.params.slug } });
    if (!s) return res.status(404).json({ error:"Not found" });
    res.json(s);
  } catch { res.status(500).json({ error:"Failed" }); }
});

export { router as servicesRouter };
