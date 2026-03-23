# RIZOTIC — Full-Stack Web Application

> **Innovate. Automate. Elevate.**

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 18 + Vite | Lightning-fast HMR, code splitting, lazy loading |
| **Routing** | React Router v6 | Client-side multi-page SPA routing |
| **Styling** | Tailwind CSS v3 | Utility-first, zero runtime CSS |
| **Animations** | Framer Motion | Production-grade page transitions + micro-interactions |
| **State** | Zustand | Minimal global state (contact form, UI) |
| **Backend** | Node.js + Express | Lightweight REST API |
| **Database** | PostgreSQL + Prisma ORM | Type-safe queries, migrations, strong relations |
| **Cache** | Redis | Rate limiting, session cache |
| **Email** | Nodemailer + SendGrid | Contact form transactional emails |
| **Auth (Admin)** | JWT + bcrypt | Secure CMS admin panel |
| **Deployment** | Docker Compose | One-command local + production setup |

---

## Pages & Routes

```
/                   → Home (Hero, tagline, CTA, quick services preview)
/about              → Company Overview, Mission/Vision, Team Structure
/services           → All 6 service cards with detail modals
/services/:slug     → Individual service deep-dive pages
/industries         → Industries We Serve (8 sectors)
/technology         → Tech Stack showcase
/process            → Our 5-Step Approach
/contact            → Contact form + details
/admin              → CMS Dashboard (password protected)
```

---

## Project Structure

```
rizotic/
├── frontend/                   # React + Vite app
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx             # Router setup + layout
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx  # Sticky nav, mobile hamburger
│   │   │   │   └── Footer.jsx
│   │   │   ├── ui/
│   │   │   │   ├── ServiceCard.jsx
│   │   │   │   ├── IndustryCard.jsx
│   │   │   │   ├── ProcessStep.jsx
│   │   │   │   └── TechBadge.jsx
│   │   │   └── sections/
│   │   │       ├── Hero.jsx
│   │   │       ├── ServicesPreview.jsx
│   │   │       └── ContactCTA.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── Industries.jsx
│   │   │   ├── Technology.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Admin.jsx
│   │   ├── hooks/
│   │   │   ├── useScrollReveal.js   # Intersection Observer animations
│   │   │   └── useContactForm.js    # Form state + submission
│   │   ├── lib/
│   │   │   ├── api.js               # Axios instance with base URL
│   │   │   └── constants.js         # Services, industries, tech data
│   │   └── assets/
│   │       └── data/
│   │           ├── services.js
│   │           ├── industries.js
│   │           └── techstack.js
│
├── backend/                    # Node.js + Express API
│   ├── package.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma       # DB models
│   └── src/
│       ├── index.js            # Entry point
│       ├── config/
│       │   ├── db.js           # Prisma client
│       │   └── redis.js        # Redis client
│       ├── middleware/
│       │   ├── auth.js         # JWT verify
│       │   └── rateLimit.js    # Redis-based rate limiter
│       ├── routes/
│       │   ├── contact.js      # POST /api/contact
│       │   ├── services.js     # GET /api/services
│       │   └── admin.js        # Admin CRUD (protected)
│       ├── controllers/
│       │   ├── contactController.js
│       │   └── serviceController.js
│       └── models/             # Prisma schema reference
│
├── docker-compose.yml          # Postgres + Redis + Backend + Frontend
└── .env.example
```

---

## Database Schema (Prisma)

```prisma
model ContactSubmission {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  company   String?
  message   String
  service   String?  // which service they're inquiring about
  createdAt DateTime @default(now())
  read      Boolean  @default(false)
}

model Service {
  id          Int     @id @default(autoincrement())
  slug        String  @unique
  name        String
  description String
  icon        String
  color       String
  features    Json    // Array of feature strings
  order       Int     @default(0)
}

model SiteContent {
  id      Int    @id @default(autoincrement())
  key     String @unique  // e.g. "hero.tagline", "about.overview"
  value   String
  type    String @default("text")  // text | html | json
}
```

---

## Performance Features

- **Code splitting** — each page is a lazy-loaded chunk (`React.lazy + Suspense`)
- **Image optimization** — WebP with lazy loading + blur placeholders
- **CSS purging** — Tailwind removes unused styles (final CSS < 15KB)
- **API caching** — Static data (services, industries) cached in Redis (1hr TTL)
- **Prefetching** — React Router preloads adjacent pages on hover
- **Compression** — gzip/brotli via Express `compression` middleware
- **Rate limiting** — 100 req/15min per IP on `/api/contact`

---

## Quick Start

```bash
# 1. Clone & install
git clone <your-repo>
cd rizotic

# 2. Set environment variables
cp .env.example .env
# Fill in: DATABASE_URL, REDIS_URL, JWT_SECRET, SENDGRID_API_KEY

# 3. Start everything with Docker
docker-compose up -d

# 4. Run DB migrations
cd backend && npx prisma migrate dev

# 5. Seed initial data
npx prisma db seed

# 6. Frontend dev server (separate terminal)
cd frontend && npm install && npm run dev
# → http://localhost:5173
```

---

## Environment Variables

```env
# Backend (.env)
DATABASE_URL="postgresql://rizotic:password@localhost:5432/rizotic_db"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-key"
PORT=3001

# Email
SENDGRID_API_KEY="SG...."
FROM_EMAIL="info@rizotic.com"
ADMIN_EMAIL="info@rizotic.com"

# Frontend (frontend/.env)
VITE_API_URL="http://localhost:3001/api"
```
