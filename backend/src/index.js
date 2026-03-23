// src/index.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { contactRouter } from "./routes/contact.js";
import { servicesRouter } from "./routes/services.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ── Security & Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));

// ── Routes ───────────────────────────────────────────────────────────
app.use("/api/contact", contactRouter);
app.use("/api/services", servicesRouter);
app.use("/api/admin", adminRouter);

// ── Health Check ────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── 404 Handler ────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Error Handler ───────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Rizotic API running on port ${PORT}`);
});
