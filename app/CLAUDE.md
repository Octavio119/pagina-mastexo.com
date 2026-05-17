# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **IMPORTANT — Next.js 15 breaking changes**: APIs, conventions, and file structure differ significantly from Next.js 13/14. Read `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## Commands

```bash
npm run dev        # dev server (Turbopack enabled)
npm run build      # type-check + build
npm run start      # run production build locally
npm run lint       # eslint
```

Deploy is automatic via Vercel on push to `main`. The Next.js app lives in `app/`; `vercel.json` at repo root sets `{ "framework": "nextjs" }`.

---

## Architecture

### Project layout

```
mastexo.com/               ← repo root
├── app/                   ← Next.js project (what Vercel deploys)
│   ├── src/
│   │   ├── app/           ← App Router pages & API routes
│   │   └── components/
│   ├── data/leads.json    ← flat-file lead database (no real DB)
│   └── next.config.ts
├── outbound-mastexo-v3.json  ← n8n outbound automation workflow
└── vercel.json
```

### Page structure

Single-page marketing site. `page.tsx` → `HomeClient.tsx` (client component) orchestrates all sections and owns the global contact modal state:

```
StickyHeader
WovenLightHeroClient  (Three.js hero)
RadarServices
TrustSection
ProcessSection
BenefitsSection
Footer
WhatsAppButton        (fixed)
ContactModal          (global, shared state)
```

`openModal(category, improve)` is passed as a prop to every section so any CTA can pre-fill the modal with context.

### API routes (`src/app/api/`)

| Route | Auth | Purpose |
|-------|------|---------|
| `POST /api/contact` | none | Legacy: SMTP email + CallMeBot WhatsApp notification |
| `POST /api/leads` | none (rate-limited) | Save lead from contact modal + email notification |
| `GET /api/leads` | `x-admin-key` header | List all leads for admin panel |
| `PATCH /api/leads` | `x-admin-key` header | Update lead status (`new` → `contacted` → `closed`) |

**Lead storage**: `data/leads.json` on the file system. Note: Vercel serverless has an ephemeral filesystem — writes are lost on redeploy/cold start. Reads of the bundled file work fine.

**Admin auth**: `x-admin-key: <ADMIN_PASSWORD>` header. Brute-force protected: 10 failed attempts → 15-minute IP lockout.

**Rate limiting**: In-memory per IP, resets on cold start. Contact: 3 req/hour. Leads: 5 req/hour.

### Design system

- **Background**: `#0A0A0A` (near-black)
- **Accent**: `#D4A853` (gold)
- **Font display**: Cormorant Garamond (`--font-display`) — headings
- **Font body**: Syne (`--font-body`) — UI/sans
- **CSS**: Tailwind v4 via PostCSS plugin — no `tailwind.config.js`, config is in CSS
- **Animations**: Framer Motion
- **3D**: Three.js (hero section)
- **UI primitives**: shadcn/ui components in `src/components/ui/`

### Environment variables

```
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS   # Gmail SMTP
LEAD_EMAIL          # destination for lead notification emails
LEAD_EMAIL_CC       # CC recipient
ADMIN_PASSWORD      # protects /admin and admin API routes
CALLMEBOT_PHONE     # WhatsApp number for lead notifications
CALLMEBOT_APIKEY    # CallMeBot API key
NEXT_PUBLIC_GA_ID   # Google Analytics measurement ID (G-XXXXXXXX)
```

### SEO & security

- Global metadata, OG tags, and `ProfessionalService` JSON-LD schema are in `layout.tsx`
- `sitemap.ts` and `robots.ts` generate dynamically
- Security headers (CSP, HSTS, CORP, COOP, X-Frame-Options, etc.) are defined in `next.config.ts` under `securityHeaders`. **When adding new external domains** (scripts, fonts, APIs), update the CSP there.

### n8n outbound automation (`outbound-mastexo-v3.json`)

Weekly workflow (Mondays 9am) that:
1. Searches 36 Google Maps terms across Chilean cities via Apify actor `nwua9Gu5YrADL7ZDj`
2. Rotates 4 Apify account tokens (`Rotar Token Apify` node) to stay under the 8192MB/account memory limit
3. Fetches emails via Hunter.io for businesses that have websites
4. Deduplicates against a Google Sheets lead list
5. Sends cold email + follow-up (3 days later) via Gmail SMTP

Import this JSON into n8n to update the live workflow (ID: `I4trZEAL0rh0HmR0`).

---

## Skills de Ventas disponibles (`skills/`)

Seven marketing skills can be invoked for prospecting and sales work:
`pagina-ventas`, `investigacion-mercado`, `guion-ventas`, `lead-magnet`, `cartas-ventas`, `persona-cliente`, `presentacion-ventas`

@AGENTS.md
