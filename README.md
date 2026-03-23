# RIZOTIC — Static Portfolio Website

Pure React + Vite frontend, served by nginx. No database, no backend.

## Stack
- React 18 + Vite (frontend)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Zustand (theme state)
- Nginx (static server)
- Docker (deployment)

## Contact Form
The contact form uses [Web3Forms](https://web3forms.com) — free, no backend needed.
1. Get a free key at https://web3forms.com
2. Create `frontend/.env` with: `VITE_WEB3FORMS_KEY=your_key`
3. Without the key, the form opens a mailto: link instead

## Run Locally (with Docker)
```
docker-compose build --no-cache
docker-compose up -d
# Open http://localhost
```

## Run Locally (without Docker)
```
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

## Pages
- / — Home (hero, services, tech stack, industries)
- /about — Company overview, mission, team
- /services — All services grid
- /services/:slug — Individual service detail with photo
- /industries — Industries we serve
- /technology — Technology stack
- /process — Our 5-step process
- /contact — Contact form
