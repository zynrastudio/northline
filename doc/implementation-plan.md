# Northline Creative — Implementation Plan

**Version:** 1.0  
**Source of truth:** [prd.md](./prd.md)  
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4  
**Project intent:** Build the functional, strategically underdeveloped “before” marketing site that becomes the foundation for a later redesign case study.

---

## 1. Guiding Principles

This build must match the PRD’s business reality — not invent problems for the redesign narrative.

| Do | Don’t |
| --- | --- |
| Ship a clean, corporate, brochure-style agency site | Over-engineer conversion funnels or personalization |
| Present all six services as equal offerings | Specialize by industry or outcome |
| Use broad messaging (“Creative Solutions for Modern Businesses”) | Add strong differentiation or niche positioning |
| Keep content descriptive (creativity, quality, experience) | Emphasize measurable outcomes, process depth, or case-study rigor |
| Use rounded cards, blue accents, stock photography, minimal motion | Build a distinctive visual system or advanced interactions |
| Email contact submissions only | Integrate CRM, lead scoring, or automation |

**Out of scope (explicitly deferred):** client portal, CRM workflows, lead scoring, industry landing pages, calculators, scheduling, proposal generation, marketing automation, personalized content, advanced analytics.

---

## 2. Current Baseline

| Item | Status |
| --- | --- |
| Next.js 16 + React 19 + Tailwind 4 scaffold | Present |
| App routes for agency pages | Not started |
| Design system / brand tokens | Not started |
| Content / CMS | Not started |
| Contact form + email delivery | Not started |
| Analytics / SEO plumbing | Not started |

Starting point: default `create-next-app` home page. All Northline product work begins from Phase 0.

---

## 3. Information Architecture & Routes

Mirror the PRD IA exactly.

```
/                         Home
/services                 Services index
/services/website-design  Service detail
/services/branding
/services/digital-marketing
/services/content-creation
/services/graphic-design
/services/ui-ux-design
/portfolio                Portfolio grid
/portfolio/[slug]         Project detail
/about                    About
/blog                     Blog listing
/blog/[slug]              Article
/contact                  Contact / consultation
```

Primary nav (all pages): Home · Services · Portfolio · About · Blog · Contact

Secondary CTAs sitewide:

- Primary: **Contact Us** → `/contact`
- Secondary: **View Portfolio** → `/portfolio`

---

## 4. Phased Delivery

### Phase 0 — Foundation & Design System

**Goal:** Shared shell, tokens, and content model before page builds.

#### 0.1 Project structure

```
app/
  layout.tsx                 # Root layout, fonts, metadata defaults
  page.tsx                   # Home
  services/
  portfolio/
  about/
  blog/
  contact/
  api/contact/route.ts       # Form handler (email)
  sitemap.ts
  robots.ts
components/
  layout/                    # Header, Footer, MobileNav
  home/                      # Homepage section components
  services/
  portfolio/
  blog/
  shared/                    # CTA, SectionHeading, Card, Button, etc.
content/                     # Typed content modules or MDX (see CMS decision)
lib/
  seo.ts
  email.ts
  analytics.ts
public/
  images/
```

#### 0.2 Visual direction (PRD-aligned)

- **Look:** Clean, corporate, traditional marketing hierarchy
- **Color:** Blue accent palette on light neutrals (CSS variables)
- **UI patterns:** Rounded cards, simple iconography, large photography
- **Typography:** Sans-serif (comfortable marketing scale — large headings, generous spacing). Prefer a conventional agency sans (e.g. Inter / Source Sans / similar) over expressive display fonts — this is the “before” site
- **Imagery:** Stock-style office, team, laptop mockups, workspace, meetings
- **Motion:** Minimal (subtle hover / fade only)

Define tokens in `globals.css`:

- `--color-brand`, `--color-brand-dark`, `--color-surface`, `--color-text`, `--color-muted`, `--radius-card`, spacing scale

#### 0.3 Shared layout

- Sticky header with logo + primary nav + Contact CTA
- Mobile nav (hamburger / drawer)
- Footer: nav links, contact details, social placeholders, copyright
- Semantic landmarks (`header`, `nav`, `main`, `footer`)

#### 0.4 Content & CMS approach

PRD requires: blog management, portfolio management, basic page editing, team management.

**Recommended for this phase of the fiction project:**

| Option | When to use |
| --- | --- |
| **A. Local typed content** (`content/*.ts` + MDX for blog) | Fastest; fine for portfolio fiction; versioned with git |
| **B. Headless CMS** (e.g. Sanity / Contentful) | If you need a real editorial UI for demos |

Default plan: **Option A**, structured so Option B can replace the data layer later without rewriting pages.

Content entities:

- `Service` — slug, title, short description, overview, benefits[], image, related project slugs
- `Project` — slug, title, industry, summary, hero, services[], gallery[]
- `TeamMember` — name, role, bio, photo
- `Testimonial` — quote, name, company, avatar?
- `BlogPost` — slug, title, excerpt, body, date, cover, tags?
- `SiteSettings` — company name, tagline, contact email/phone/address, social links

Seed enough content for a believable brochure: **6 services**, **6–8 projects**, **4–6 team members**, **3–4 testimonials**, **4–6 blog posts**.

#### 0.5 Acceptance criteria

- [ ] Design tokens and layout shell render on a blank home stub
- [ ] Nav links match PRD routes (even if pages are placeholders)
- [ ] Content types defined and seed data started

---

### Phase 1 — Core Marketing Pages

**Goal:** Homepage + Services + About — the brochure spine.

#### 1.1 Homepage (`/`)

Sections in order (PRD):

1. **Hero** — headline around “Creative Solutions for Modern Businesses”; short support line; primary + secondary CTAs; large stock hero image
2. **Services overview** — six service cards (title, short blurb, link to detail); equal visual weight
3. **Featured projects** — 3–4 portfolio teasers
4. **About preview** — short agency blurb + link to `/about`
5. **Testimonials** — simple quote cards
6. **Blog preview** — latest 2–3 posts
7. **CTA band** — Contact Us

Messaging rules: creativity / quality / growth language; no niche claim; industries mentioned generically if at all.

#### 1.2 Services index (`/services`)

- Grid/list of all six services
- Each: title, short description, supporting image, link to detail
- Minimal supporting detail (per PRD)

#### 1.3 Service detail pages (`/services/[slug]`)

For each of the six services:

- Overview
- Benefits (bullet list — general, not outcome-heavy)
- Example projects (filtered from portfolio)
- Contact CTA

Service set:

| Slug | Label |
| --- | --- |
| `website-design` | Website Design |
| `branding` | Branding |
| `digital-marketing` | Digital Marketing |
| `content-creation` | Content Creation |
| `graphic-design` | Graphic Design |
| `ui-ux-design` | UI / UX Design |

#### 1.4 About (`/about`)

- Company overview
- Mission
- Values
- Team members grid
- Office / workspace photos

Tone: professional, friendly, creative, reliable, modern — confident but generic business language.

#### 1.5 Acceptance criteria

- [ ] All homepage sections present and linked correctly
- [ ] Six service pages live with overview / benefits / examples / CTA
- [ ] About includes mission, values, team, office imagery
- [ ] Primary CTAs consistently go to Contact; secondary to Portfolio

---

### Phase 2 — Portfolio & Blog

**Goal:** Showcase work and thought leadership at brochure depth.

#### 2.1 Portfolio index (`/portfolio`)

- Responsive grid
- Each card: thumbnail, industry tag, short summary, link to project
- Optional light filter by industry (nice-to-have; not required). If added, keep it superficial — industries listed in PRD are not positioning pillars

Industries to represent across projects (spread, not specialize): Healthcare, Finance, Real Estate, Retail, Technology, Manufacturing, Education, Hospitality.

#### 2.2 Project detail (`/portfolio/[slug]`)

Per PRD portfolio strategy:

- Hero image
- Short overview
- Services provided
- Image gallery

**Intentionally limited:** challenge, thinking, process, measurable outcomes — omit or keep one shallow sentence max so the redesign has clear contrast.

#### 2.3 Blog listing (`/blog`)

- Standard article list: cover, title, date, excerpt
- Topics: agency updates, marketing tips, design inspiration

#### 2.4 Blog article (`/blog/[slug]`)

- Title, date, cover, body (MDX or rich HTML)
- Basic related posts optional
- End-of-article Contact CTA optional but consistent with brochure pattern

#### 2.5 Acceptance criteria

- [ ] Portfolio grid + detail pages match PRD fields
- [ ] Blog listing + article pages work with seeded posts
- [ ] Case studies stay visual/descriptive, not outcome-led

---

### Phase 3 — Contact, Lead Capture & Integrations

**Goal:** Consultation requests via a simple form; email delivery; analytics; SEO basics.

#### 3.1 Contact page (`/contact`)

Form fields (exactly):

- Name
- Company
- Email
- Phone
- Message

Behavior:

- Client-side validation (required name/email/message; email format; phone optional or lightly validated)
- Server action or `POST /api/contact`
- Success / error states
- No qualification questions, discovery steps, or conditional logic

This form **is** the consultation request.

#### 3.2 Email delivery

- On submit, email agency inbox (Resend, Nodemailer, or similar)
- Confirmation email to visitor optional (nice-to-have)
- No CRM write, no tagging, no automation

#### 3.3 Analytics

- Google Analytics (gtag / GA4)
- Basic page tracking
- Contact form conversion event (e.g. `generate_lead` / custom `contact_submit`)

#### 3.4 SEO & metadata

- Per-page `title` + `meta description`
- Open Graph tags
- Canonical URLs
- `app/sitemap.ts` + `app/robots.ts`
- Semantic headings; descriptive alt text on images

#### 3.5 Acceptance criteria

- [ ] Form submits and emails successfully in staging
- [ ] GA pageviews + form conversion fire
- [ ] Sitemap includes all public routes
- [ ] OG preview looks correct for Home, Services, Portfolio, Blog posts

---

### Phase 4 — Accessibility, Performance & Polish

**Goal:** Meet PRD quality bars without changing strategic shallowness.

#### 4.1 Accessibility

- Responsive layouts (mobile → desktop)
- Keyboard navigation for nav, forms, interactive controls
- Accessible form labels, errors, focus states
- Semantic HTML
- Alt text on meaningful images; decorative images marked appropriately
- Color contrast meeting WCAG AA for text/UI

#### 4.2 Performance

- Next.js `Image` with sizing + responsive `sizes`
- Lazy loading below the fold
- Caching headers / static generation where content is static
- Avoid heavy client JS; prefer Server Components by default
- Reasonable Lighthouse targets for a marketing site (not a vanity score chase)

#### 4.3 Content & QA pass

- Proof all service/industry copy for generic agency voice
- Broken-link crawl
- Form spam basic protection (honeypot or simple rate limit — keep light)
- Cross-browser smoke test (Chromium + Safari/WebKit + Firefox)

#### 4.4 Acceptance criteria

- [ ] Keyboard-only path through nav → service → contact submit
- [ ] Images optimized; no obvious CLS from hero media
- [ ] No critical a11y issues on primary flows

---

### Phase 5 — Launch Readiness

**Goal:** Deploy the “before” site as a stable baseline for the redesign case study.

- Environment variables documented (email API key, GA ID, site URL)
- Production deploy (Vercel or equivalent)
- Custom domain optional
- README updated with setup, content editing notes, and link to PRD + this plan
- Optional: short “known limitations / redesign opportunities” note for case-study authors (maps to PRD Future Opportunities — documentation only, no product work)

---

## 5. Page → Requirement Traceability

| PRD requirement | Implementation |
| --- | --- |
| Nav: Home, Services, Portfolio, About, Blog, Contact | Shared `Header` |
| Homepage sections | Phase 1.1 components |
| Services list + 6 detail pages | Phase 1.2–1.3 |
| Portfolio grid + project pages | Phase 2.1–2.2 |
| About: overview, mission, values, team, office | Phase 1.4 |
| Blog listing + articles | Phase 2.3–2.4 |
| Contact form fields | Phase 3.1 |
| Consultation = simple form | Phase 3.1–3.2 |
| Email submissions, no CRM | Phase 3.2 |
| GA + form conversion | Phase 3.3 |
| Metadata, OG, sitemap | Phase 3.4 |
| CMS: blog, portfolio, pages, team | Phase 0.4 content layer |
| A11y + performance | Phase 4 |
| Out-of-scope items | Explicitly excluded |

---

## 6. Suggested Component Inventory

| Component | Used on |
| --- | --- |
| `Header` / `MobileNav` / `Footer` | All |
| `Button` / `LinkButton` | All |
| `SectionHeading` | Most pages |
| `ServiceCard` | Home, Services |
| `ProjectCard` | Home, Portfolio, Service detail |
| `TestimonialCard` | Home |
| `BlogCard` | Home, Blog |
| `TeamMemberCard` | About |
| `CtaBand` | Home, Service, Project, Blog |
| `ContactForm` | Contact |
| `PageHero` | Interior pages |

Keep components presentational and brochure-simple. Prefer composition over abstraction until duplication hurts.

---

## 7. Content Production Checklist

Before calling Phase 1–2 done, produce:

- [ ] Brand name lockup / logo (SVG)
- [ ] Tagline + homepage hero copy
- [ ] 6 service short + long descriptions + benefit bullets
- [ ] 6–8 fictional projects with industries + galleries
- [ ] 4–6 team bios + photos
- [ ] 3–4 testimonials
- [ ] 4–6 blog posts
- [ ] Office / stock image set with licenses documented
- [ ] Contact details (fictional but consistent)

---

## 8. Success Metrics Wiring

PRD metrics → how we observe them:

| Metric | Implementation |
| --- | --- |
| Consultation inquiries | Form submissions (email + GA conversion event) |
| Contact form submissions | Same as above; optional simple server log |
| Portfolio page views | GA pageviews on `/portfolio` and `/portfolio/*` |
| Time on service pages | GA engagement / average engagement time on `/services/*` |

No dashboards beyond GA for v1.

---

## 9. Risk & Intentional Constraints

| Risk / constraint | Handling |
| --- | --- |
| Accidental over-design (too polished / too differentiated) | Stick to PRD visual direction; review against “generic competent agency” bar |
| Case studies too strong | Enforce shallow project template (overview + services + gallery only) |
| Scope creep into redesign features | Gate every request against Out of Scope list |
| CMS complexity slowing fiction project | Start with local content modules; swap later if needed |
| Stock imagery looking inconsistent | Define one photo style guide (lighting, crop, subject) |

---

## 10. Milestone Summary

| Phase | Deliverable | Exit gate |
| --- | --- | --- |
| **0** Foundation | Shell, tokens, content model, seed start | Nav + tokens on stub |
| **1** Core pages | Home, Services (+6), About | Brochure spine complete |
| **2** Showcase | Portfolio, Blog | Work + articles browsable |
| **3** Capture | Contact, email, GA, SEO | Inquiry path works end-to-end |
| **4** Quality | A11y, performance, QA | Primary flows accessible & performant |
| **5** Launch | Deploy + docs | Live baseline for redesign case study |

---

## 11. Immediate Next Steps

1. Finalize CMS decision (local content vs headless) — default **local typed content + MDX**.
2. Implement Phase 0 design tokens, `Header`/`Footer`, and route stubs.
3. Seed services + 2–3 projects so homepage and services can be built against real data.
4. Build homepage sections top-to-bottom, then services, then about.
5. Add portfolio/blog, then contact + email + GA.
6. Polish, deploy, document.

When implementation starts, treat this plan and `prd.md` as paired constraints: every feature should either satisfy a PRD requirement or be explicitly deferred to the future redesign.
