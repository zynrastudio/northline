# Northline Creative — After Redesign

Soft Structuralism redesign of a fictional B2B marketing-agency site. Pair with the frozen **before** baseline for the case study.

| Doc | Purpose |
| --- | --- |
| [doc/case-study-before-after.md](./doc/case-study-before-after.md) | Before vs after notes + live URLs |
| [doc/website-redesign-strategy.md](./doc/website-redesign-strategy.md) | After strategic positioning |
| [doc/redesign-implementation-plan.md](./doc/redesign-implementation-plan.md) | After phased redesign (brand kit → launch) |
| [doc/redesign-audit.md](./doc/redesign-audit.md) | Redesign diagnosis (Phase B) |
| [doc/brand-tokens.md](./doc/brand-tokens.md) | Brand kit lock (Phase A) |
| [doc/automation-analytics.md](./doc/automation-analytics.md) | Phase G: n8n automation + GA4 |
| [doc/redesign-opportunities.md](./doc/redesign-opportunities.md) | Intentional before-site gaps |
| [doc/prd.md](./doc/prd.md) | Before product requirements |
| [doc/implementation-plan.md](./doc/implementation-plan.md) | Before phased build (complete) |

## Live URLs

| Version | Branch | Vercel project | URL |
| --- | --- | --- | --- |
| **Before** (frozen brochure) | `before` | `northline-before` | https://northline-before.vercel.app |
| **After** (this redesign) | `after` | `northline-after` | https://northline-after.vercel.app |

Keep the before URL permanent. Do not deploy redesign work to `northline-before`. Case-study walkthrough: [doc/case-study-before-after.md](./doc/case-study-before-after.md).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Motion (entry / press)
- Resend (consultation + contact email)
- Self-hosted n8n (Railway) for intake
- Google Analytics 4 (optional)
- Cal.com (qualified booking redirect)

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy from `.env.example`:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended in prod | Canonical URL, sitemap, robots (`https://northline-after.vercel.app`) |
| `NEXT_PUBLIC_CAL_COM_URL` | Optional | Qualified success booking link |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID |
| `NEXT_PUBLIC_GA_DEBUG` | Optional | `true` only for local DebugView |
| `N8N_WEBHOOK_URL` / `N8N_WEBHOOK_SECRET` | Optional | Railway consultation intake |
| `AUTOMATION_FALLBACK_EMAIL` | Optional | Default soft-fail when n8n is down |
| `RESEND_API_KEY` | Required for real email | Without it, local/prod logs inquiries |
| `CONTACT_TO_EMAIL` | Optional | Defaults to site contact email |
| `CONTACT_FROM_EMAIL` | Optional | Verified Resend sender |

## Content editing

Typed content lives under `content/`:

- `site.ts` — company settings
- `home.ts` — homepage sections
- `solutions.ts` — four pillars
- `industries.ts` — sector pages
- `case-studies.ts` — outcome narratives
- `insights.ts` — frameworks / guides
- `about.ts` / `process.ts` — partnership + engagement
- `services.ts` / `projects.ts` / `blog.ts` — legacy (redirected routes)

Images are in `public/images/`. Paths in content should match files on disk.

## Branch strategy

```
before  → frozen brochure site (museum piece; bug fixes only)
after   → redesign production (Vercel northline-after)
main/master → historical; do not use for after deploys
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test:lead-scoring
npm run test:consultation-branch
```

### n8n (Phase G)

Self-hosted automation lives under [ops/n8n](./ops/n8n) (Docker Compose locally; Railway project `northline-n8n` for staging). Spec: [doc/automation-analytics.md](./doc/automation-analytics.md).

```bash
cd ops/n8n && cp .env.example .env && docker compose up -d
# Staging editor: https://n8n-production-26316.up.railway.app
```
