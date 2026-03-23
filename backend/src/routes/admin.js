// src/routes/admin.js
import { Router } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// ── Auth Middleware ───────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// POST /api/admin/login
router.post("/login", [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /api/admin/contacts — list all contact submissions
router.get("/contacts", requireAuth, async (req, res) => {
  const { page = 1, unread } = req.query;
  const take = 20;
  const skip = (parseInt(page) - 1) * take;
  try {
    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where: unread === "true" ? { read: false } : {},
        orderBy: { createdAt: "desc" },
        take,
        skip,
      }),
      prisma.contactSubmission.count(),
    ]);
    res.json({ submissions, total, page: parseInt(page), pages: Math.ceil(total / take) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// PATCH /api/admin/contacts/:id/read
router.patch("/contacts/:id/read", requireAuth, async (req, res) => {
  try {
    await prisma.contactSubmission.update({
      where: { id: parseInt(req.params.id) },
      data: { read: true },
    });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: "Submission not found" });
  }
});

// PUT /api/admin/services/:id — update a service
router.put("/services/:id", requireAuth, async (req, res) => {
  try {
    const service = await prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(service);
  } catch {
    res.status(404).json({ error: "Service not found" });
  }
});

export { router as adminRouter };
