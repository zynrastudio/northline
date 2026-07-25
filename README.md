# Northline Creative — Before Site

Fictional marketing-agency website used as the **before** baseline for a redesign case study.

| Doc | Purpose |
| --- | --- |
| [doc/prd.md](./doc/prd.md) | Product requirements |
| [doc/implementation-plan.md](./doc/implementation-plan.md) | Phased build plan |
| [doc/redesign-opportunities.md](./doc/redesign-opportunities.md) | Intentional gaps for the after redesign |

## Live URLs

| Version | Branch | Vercel project | URL |
| --- | --- | --- | --- |
| **Before** (this site) | `before` | `northline-before` | _set after deploy_ |
| **After** (future redesign) | `after` | `northline-after` | _not created yet_ |

Keep the before URL permanent. Redesign work belongs on `after` / `northline-after` only.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Resend (contact form email)
- Google Analytics 4 (optional)

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
| `NEXT_PUBLIC_SITE_URL` | Recommended in prod | Canonical URL, sitemap, robots |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID |
| `RESEND_API_KEY` | Required for real email | Without it, local dev logs inquiries |
| `CONTACT_TO_EMAIL` | Optional | Defaults to site contact email |
| `CONTACT_FROM_EMAIL` | Optional | Verified Resend sender |

## Content editing

Typed content lives under `content/`:

- `site.ts` — company settings
- `services.ts` — six services
- `projects.ts` — portfolio
- `team.ts` / `about.ts` — about page
- `blog.ts` — articles
- `testimonials.ts` — homepage quotes

Images are in `public/images/`. Paths in content should match files on disk.

## Branch strategy

```
before  → frozen brochure site (museum piece; bug fixes only)
after   → future redesign (create when redesign starts)
main/master → can track the active default; production for before is the `before` branch
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
