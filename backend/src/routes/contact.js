// src/routes/contact.js
import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";
import sgMail from "@sendgrid/mail";

const prisma = new PrismaClient();
const router = Router();

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Rate limit: 5 submissions per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests. Please try again later." },
});

const validate = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 2000 }),
  body("company").optional().trim().isLength({ max: 100 }),
  body("phone").optional().trim().isLength({ max: 20 }),
  body("service").optional().trim().isLength({ max: 100 }),
];

router.post("/", limiter, validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, company, phone, service, message } = req.body;

  try {
    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: { name, email, company, phone, service, message },
    });

    // Send notification email to admin
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send({
        to: process.env.ADMIN_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: `New contact from ${name} — Rizotic`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ""}
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });

      // Auto-reply to user
      await sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "We received your message — Rizotic",
        html: `
          <h2>Hi ${name},</h2>
          <p>Thank you for reaching out to Rizotic! We've received your message and our team will get back to you within 1–2 business days.</p>
          <br/>
          <p><strong>Rizotic Technologies</strong><br/>Innovate. Automate. Elevate.</p>
          <p>📞 +880 1614644644 | 🌐 www.rizotic.com</p>
        `,
      });
    }

    res.status(201).json({
      success: true,
      message: "Message received! We'll be in touch soon.",
      id: submission.id,
    });
  } catch (err) {
    console.error("Contact submission error:", err);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export { router as contactRouter };
