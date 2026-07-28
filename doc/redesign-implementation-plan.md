# Northline Creative — Redesign Implementation Plan (After)

**Version:** 1.0  
**Status:** Ready to execute  
**Mode:** Redesign — Overhaul (new visual language + strategic repositioning; preserve stack and deploy discipline)  
**Sources of truth:**
- [website-redesign-strategy.md](./website-redesign-strategy.md) — business strategy, IA, conversion, qualification
- [redesign-opportunities.md](./redesign-opportunities.md) — intentional before-site gaps
- [implementation-plan.md](./implementation-plan.md) — completed **before** build (archive / contrast reference)
- [prd.md](./prd.md) — original before PRD (do not treat as after requirements)
- [automation-analytics.md](./automation-analytics.md) — Phase G automation (Docker n8n) + analytics spec

**Stack (preserve):** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4  
**Branch / deploy:** `after` branch · Vercel project `northline-after` · keep `before` / `northline-before` frozen

---

## 0. Design Read & Skill Stack

### Design Read

> Reading this as: **redesign overhaul** of a B2B agency marketing site for **procurement-minded growth buyers**, with a **premium consulting / editorial-architectural** language, leaning toward **Tailwind v4 + custom brand tokens + Motion (and GSAP only where scroll-hijack is justified)**.

### Dial settings (design-taste-frontend)

| Dial | Value | Rationale |
| --- | ---: | --- |
| `DESIGN_VARIANCE` | **7** | Asymmetric splits, restrained bento, editorial whitespace — not artsy chaos |
| `MOTION_INTENSITY` | **6** | Purposeful entry, hover physics, 2–3 scroll-motivated moments; honor `prefers-reduced-motion` |
| `VISUAL_DENSITY` | **3** | Gallery-like air: large type, refined spacing, few decorative elements |

### Skills — when to invoke

| Phase | Skill | Role |
| --- | --- | --- |
| **A** | `.agents/skills/brandkit/SKILL.md` | Generate Northline brand-kit boards; lock logo, palette, type, metaphor before UI work |
| **B** | `.agents/skills/redesign-existing-projects/SKILL.md` | Audit before site; diagnose generic patterns; prioritize fix order without rewriting the stack |
| **C–F** | `.agents/skills/design-taste-frontend/SKILL.md` | Anti-slop layout/copy/motion rules, pre-flight matrix, IA-aware section diversity |
| **C–F** | `.agents/skills/high-end-visual-design/SKILL.md` | Agency-tier surfaces (double-bezel, island nav, haptic CTAs, spring motion) applied with restraint for B2B trust |

**Conflict resolution:** Strategy doc wins for IA, messaging, and conversion. Brandkit wins for identity tokens. design-taste-frontend wins for anti-slop / pre-flight. high-end-visual-design wins for craft density **within** those constraints (no Ethereal Glass purple mesh unless brandkit explicitly chooses it; prefer Soft Structuralism or a calm Dark Nature / editorial-architectural mode that matches “consulting firm, not decorated agency”).

### Guiding principle (from strategy)

The redesign is not about looking better. It is about making the business easier to understand, easier to trust, and easier to engage.

---

## 1. Before → After Transformation Map

| Dimension | Before (shipped) | After (this plan) |
| --- | --- | --- |
| Position | Full-service creative agency | Strategic B2B growth partner |
| Messaging | “Creative Solutions for Modern Businesses” | Outcome-led: acquire better customers via digital experiences + automation |
| Services | 6 equal offerings | 4 solution pillars (Strategy, Digital Experiences, Business Automation, Growth Enablement) |
| Proof | Visual portfolio | Challenge → Strategy → Execution → Outcome → Lessons |
| CTA | Contact Us | Book Strategy Consultation (+ Explore Case Studies / See How We Work) |
| Lead capture | Name / company / email / phone / message | Guided qualification (company, industry, budget, timeline, goals, scope, decision maker, challenges) |
| Ops | Email only | Lead score → n8n (Docker) → opportunity record → notify → confirm → qualify → calendar or resources |
| Visual | Blue brochure, rounded cards, stock, Inter-adjacent Source Sans | Brandkit system: premium, minimal, editorial, architectural |
| Nav | Home · Services · Portfolio · About · Blog · Contact | Home · Solutions · Industries · Case Studies · Process · Insights · About · Book Consultation |

---

## 2. Branch & Repo Hygiene (do first)

1. Create / checkout `after` from current before baseline (or from `before` tag).
2. Create Vercel project `northline-after`; never overwrite `northline-before`.
3. Update README “Live URLs” when the after project exists.
4. Keep content editable under `content/`; evolve schemas rather than inventing a CMS mid-redesign unless needed.
5. Document env additions for n8n webhook / calendar / scoring / analytics in `.env.example` as phases land. See [automation-analytics.md](./automation-analytics.md).

**Exit gate:** `after` branch builds; before production URL unchanged.

---

## 3. Phased Delivery

### Phase A — Brand Kit (skill: brandkit)

**Goal:** Ownable identity before any page redesign. No UI overhaul until the kit is approved.

#### A.1 Brand strategy (infer, then lock)

| Lens | Northline Creative (after) |
| --- | --- |
| Category | B2B growth / digital strategy partner |
| Audience | Founders, marketing leaders, ops leads at Professional Services, SaaS, Industrial, Manufacturing, Technology |
| Personality | Confident, restrained, precise, sophisticated |
| Emotional promise | Clarity and trust before commitment |
| Core metaphor | **Northline** = true direction / navigational meridian — the straight path from problem → growth |
| Logo logic | Monogram `N` fused with a horizon / meridian / path (construction geometry + negative space). Avoid generic lightning, crests, AI sparkles |
| Visual mode | Soft Structuralism + editorial-architectural restraint (light primary; optional dark accents for process/terminal moments only if kit allows — prefer **one theme lock** for marketing pages) |
| Avoid | Purple AI gradients, cream+brass luxury cliché, brochure blue card grids, stock laptop heroes |

#### A.2 Generate brand-kit boards

Invoke **brandkit** with a **3×3** overview (aspect `4:3` or `16:10`), then optional **2×3** mini-deck if needed for stakeholder review.

Required panels (3×3):

1. Logo cover + wordmark  
2. Logo construction / geometry  
3. Digital application (browser / consulting UI fragment — identity, not fake dashboard)  
4. Brand essence / tagline  
5. Color system  
6. Typography pairing  
7. Physical application (card / folder / seal)  
8. Image direction (workshops, collaboration, strategy rooms — not generic laptops)  
9. System detail (CTA chip, input, badge strip)

Suggested tagline candidates (pick one during A.3):

- “Clarity builds confidence.”
- “Direction for B2B growth.”
- “From presence to pipeline.”

#### A.3 Token extraction → codebase

Translate approved kit into:

```
brand/
  brand-kit/                 # generated boards + notes
  logo/                      # SVG mark, wordmark, favicon sources
doc/brand-tokens.md          # written lockfile: hex, type, radii, motion notes
app/globals.css              # CSS variables from kit
```

Lock:

- Palette (1 dominant accent, neutrals in one gray family, saturation &lt; 80%)
- Type (expressive sans display + body; **no Inter / Roboto / Arial**; serif only if kit explicitly justifies editorial heritage)
- Radii scale (one shape system)
- Logo clearspace and usage
- Photography direction keywords

#### A.4 Acceptance criteria

- [x] Brand-kit image(s) generated via brandkit skill and stored under `brand/`
- [x] Logo usable as icon, wordmark, favicon
- [x] `doc/brand-tokens.md` + `globals.css` tokens match the kit
- [x] One accent color locked sitewide
- [x] Stakeholders can answer: metaphor, mark logic, why it feels ownable

**Phase A complete.** Token lockfile: [brand-tokens.md](./brand-tokens.md). Next: Phase B audit.

---

### Phase B — Audit & Redesign Diagnosis (skill: redesign-existing-projects)

**Goal:** Scan the live before codebase; list every generic pattern and gap; decide preserve vs replace. Do not rewrite from scratch.

#### B.1 Scan (current baseline)

| Area | Current state (expected) |
| --- | --- |
| Framework | Next.js App Router, RSC-first |
| Styling | Tailwind 4 + CSS variables (blue brochure) |
| Routes | `/`, `/services`, `/services/[slug]`, `/portfolio`, `/portfolio/[slug]`, `/about`, `/blog`, `/blog/[slug]`, `/contact` |
| Lead path | Resend email, simple form |
| Motion | Minimal hover / fade |

#### B.2 Diagnose against redesign-existing-projects audit

Document findings in `doc/redesign-audit.md` (create during this phase):

**Typography** — Source Sans / marketing-generic; limited weight hierarchy  
**Color** — saturated blue accent; flat white surfaces  
**Layout** — centered brochure, equal service cards, card-heavy  
**Interactivity** — thin hover states; no consulting-grade motion  
**Content** — service-equal, visual portfolio, tip blog  
**IA** — internal org chart, not buyer journey  
**Conversion** — unqualified Contact Us  

Also map strategy success metrics → instrumentation needs for later phases.

#### B.3 Fix priority (skill order)

Apply upgrades in this order (do not skip ahead to “pretty hero”):

1. Font swap → brandkit type  
2. Color palette cleanup → brandkit tokens  
3. Hover / active / focus states  
4. Layout & spacing rhythm  
5. Replace generic components (equal cards, pill spam, Inter tells)  
6. Loading / empty / error states (esp. consultation flow)  
7. Typography scale polish  

#### B.4 Preserve vs replace

| Preserve | Replace / evolve |
| --- | --- |
| Next.js + Tailwind stack | Visual language + tokens |
| Local typed content pattern | Content schemas + copy voice |
| Resend plumbing (as notification channel) | Form fields + qualification + n8n automation |
| SEO file patterns (`sitemap`, `robots`, metadata helpers) | Slugs / titles / IA labels (approve redirects) |
| Accessibility foundations (skip link, focus, AA intent) | Expand to new forms and motion |

**SEO rule:** Changing nav labels and routes requires an explicit redirect map. Do not silently break `/services` and `/portfolio` URLs without `next.config` redirects or dual routes during transition.

#### B.5 Acceptance criteria

- [x] `doc/redesign-audit.md` completed with diagnose list
- [x] Preserve / replace table agreed
- [x] Redirect / URL migration plan drafted
- [x] No Phase C UI work started until A + B exit gates pass

**Phase B complete.** Audit: [redesign-audit.md](./redesign-audit.md). Next: Phase C (design system & shell).

---

### Phase C — Design System & Shell (skills: design-taste-frontend + high-end-visual-design)

**Goal:** Implement the after visual system and global chrome before page content rewrites.

#### C.1 Design system

- CSS variables from brandkit fully wired into `@theme`
- Button system: primary / secondary / tertiary — **one CTA intent label** sitewide for consultation (“Book Strategy Consultation”)
- Island / floating nav (high-end-visual-design) with single-line desktop nav ≤ 80px height; mobile morph menu with staggered reveal
- Footer simplified: primary paths + legal (privacy / terms) — not a 4-column link farm
- Double-bezel only where elevation earns hierarchy (case study media, consultation panel) — not on every block
- Grain/noise as fixed `pointer-events-none` overlay if kit calls for it
- Icon family: Phosphor (or HugeIcons / Tabler) — **not Lucide** unless already locked; one family only
- Motion: `motion/react` for UI; GSAP ScrollTrigger only for justified pin/scrub moments; never `window.addEventListener('scroll')`
- Dark mode: **page theme lock** — pick light **or** dark for marketing (strategy favors premium editorial; default recommendation: **light Soft Structuralism** with charcoal ink). Dual-mode only if brandkit requires it; if dual, tokens in one place, no mid-page theme flips

#### C.2 Shared layout IA

Primary nav:

`Home` · `Solutions` · `Industries` · `Case Studies` · `Process` · `Insights` · `About` · `Book Consultation`

Secondary CTAs:

- Primary → `/book-consultation` (or `/consultation`)
- Secondary → `/case-studies`
- Supporting → `/process`

#### C.3 Component inventory (after)

| Component | Notes |
| --- | --- |
| `Header` / `MobileNav` / `Footer` | Island nav; active route state |
| `Button` / magnetic hover leaf | Button-in-button trailing icon where used |
| `Reveal` / `RevealStagger` | Client islands; reduced-motion safe |
| `SolutionPillar` | Not equal service cards |
| `CaseStudyCard` / `CaseStudyNarrative` | Outcome-led fields |
| `IndustryStrip` / `IndustryPanel` | Buyer-facing |
| `ProcessSteps` | Verb-noun labels; no “Stage 1” |
| `InsightCard` | Strategic content, not tip spam |
| `ConsultationForm` | Multi-step qualification |
| `CtaBand` | Single intent |

#### C.4 Acceptance criteria

- [x] Tokens + fonts live; before blue brochure gone from shell
- [x] Nav matches after IA on all stub routes
- [x] design-taste pre-flight: shape lock, accent lock, no Inter, no AI purple default
- [x] high-end craft present without decorating every section

**Phase C complete.** Shell refs: `brand/phase-c/`. Next: Phase D (IA & core pages).

---

### Phase D — Information Architecture & Core Pages

**Goal:** Rebuild buyer-facing pages around strategy IA and messaging.

#### D.1 Route map

```
/                            Home
/solutions                   Solutions index (pillars)
/solutions/[slug]            Pillar detail
/industries                  Industries index
/industries/[slug]           Industry page
/case-studies                Case studies index
/case-studies/[slug]         Case study narrative
/process                     How we work
/insights                    Insights listing
/insights/[slug]             Article / guide / framework
/about                       About (maturity, not generic mission soup)
/book-consultation           Guided qualification + booking path
```

**Migration from before:**

| Before | After |
| --- | --- |
| `/services`, `/services/*` | `/solutions`, `/solutions/*` (+ redirects) |
| `/portfolio`, `/portfolio/*` | `/case-studies`, `/case-studies/*` (+ redirects) |
| `/blog`, `/blog/*` | `/insights`, `/insights/*` (+ redirects) |
| `/contact` | `/book-consultation` (+ redirect) |

#### D.2 Homepage composition

One composition in the first viewport (user frontend rules + taste skill):

- Brand as hero-level signal  
- One headline (≤ 2 lines) answering business value  
- One supporting sentence (≤ 20 words)  
- One CTA group (primary + optional secondary)  
- One dominant full-bleed visual (workshop / strategy atmosphere — generated or art-directed)

**Banned in hero:** stats, logo walls, feature grids, schedule chips, overlays, version labels, scroll cues.

Below hero (vary layout families; max 1 eyebrow per 3 sections):

1. Positioning / promise (editorial, not 3 equal cards)  
2. Solution pillars (asymmetric — not 4 identical towers)  
3. Proof teaser (case studies, outcome-led)  
4. Who we serve (industries — logo-or-mark strip under hero rules if used)  
5. Process glimpse → `/process`  
6. Insight teaser  
7. Consultation CTA band  

Messaging: every headline answers “Why does this matter to the client’s business?”

#### D.3 Solutions (pillars)

| Slug | Pillar |
| --- | --- |
| `strategy` | Strategy |
| `digital-experiences` | Digital Experiences |
| `business-automation` | Business Automation |
| `growth-enablement` | Growth Enablement |

Each page structure:

1. Problem  
2. Approach  
3. Deliverables  
4. Business outcome  
5. Related case studies  
6. CTA → Book Strategy Consultation  

Map legacy six services into pillars in content (do not keep six equal nav items).

#### D.4 Industries

Launch set (strategy examples):

- Professional Services  
- SaaS  
- Industrial  
- Manufacturing  
- Technology  

Each page: understanding · challenges · relevant work · tailored solutions · CTA.

#### D.5 Process & About

- **Process:** clarity of engagement; educate before ask; no fake stage numbers  
- **About:** maturity, expertise, how Northline partners; team as operators/strategists — avoid stock “diverse team in glass office” clichés

#### D.6 Acceptance criteria

- [x] After routes render with real draft copy — Home, Solutions (+4 pillars), Industries (+5), Process, About, Book Consultation. Case Studies / Insights indexes remain intentional stubs until Phase E
- [x] Homepage hero passes brand test (remove nav → still Northline)  
- [x] Section layout families do not repeat consecutively (taste skill)  
- [x] Zero em-dashes in visible copy; no Elevate/Seamless/Unleash clichés  
- [x] Redirects from before slugs work — `/services`, `/services/[slug]`→pillar, `/portfolio`, `/blog`, `/contact` (308). Slug-level `/portfolio/[slug]` + `/blog/[slug]` deferred to Phase E when `/case-studies/[slug]` + `/insights/[slug]` exist  

---

### Phase E — Case Studies & Insights (proof engine)

**Goal:** Make evidence the primary trust mechanism.

#### E.1 Case study schema

```
Challenge
Strategy
Execution
Business Outcome
Lessons Learned
```

Plus: industry, pillars involved, hero media, optional metrics **only if fictionally consistent and labeled as case metrics** (no fake-precise vanity like `99.99%`).

#### E.2 Insights content strategy

Categories: Insights · Case Studies (cross-link) · Industry Resources · Guides · Frameworks · Thought Leadership  

Retire tip-blog voice. Prefer frameworks that demonstrate expertise before contact.

#### E.3 Visual treatment

- Full-bleed or large editorial crops; no pill overlays on images  
- Prefer generated / art-directed assets (image tools first) matching brandkit image direction  
- No div-based fake dashboards as “product shots”

#### E.4 Acceptance criteria

- [x] ≥ 4 narrative case studies with full structure (Challenge → Lessons; case metrics labeled)  
- [x] Insights listing + articles with strategic depth (tip-blog voice retired)  
- [x] Case study / insight engagement events ready for analytics (`case_study_view`, `insight_view`)  
- [x] Slug redirects: `/portfolio/[slug]` → `/case-studies/[slug]` (known) or index; `/blog/[slug]` → `/insights/[slug]`

---

### Phase F — Conversion & Lead Qualification

**Goal:** Guided consultation that educates, qualifies, and reduces bad-fit calls.

#### F.1 CTA system (sitewide)

| Role | Label | Destination |
| --- | --- | --- |
| Primary | Book Strategy Consultation | `/book-consultation` |
| Secondary | Explore Case Studies | `/case-studies` |
| Supporting | See How We Work | `/process` |

No duplicate intents with different labels.

#### F.2 Qualification form fields (strategy)

- Company  
- Industry  
- Budget  
- Timeline  
- Business goals  
- Project scope  
- Decision maker  
- Current challenges  

Plus essentials: name, email, phone (as needed). Multi-step UI with progress, validation, inline errors — not `window.alert`.

#### F.3 Experience principles

- Educate before commit (process + case studies linked in-flow)  
- Success state: clear next step (calendar or “we’ll review”)  
- Error / empty / loading states composed  
- Accessible labels, focus, AA contrast on inputs  

#### F.4 Acceptance criteria

- [x] Form collects strategy fields with validation (3-step: essentials → situation → engagement; per-step + server validation, inline errors, no `window.alert`)  
- [x] Success / error states polished (progress bar, loading label, brand success panel with next-step links, form-level error banner, honeypot)  
- [x] CTA labels consistent across nav, hero, footer (all live CTAs read from `cta.*`: Book Strategy Consultation / Explore Case Studies / See How We Work)  

---

### Phase G — Automation & Analytics (n8n on Docker)

**Goal:** Intelligent qualification workflow from strategy doc, orchestrated by **self-hosted n8n** (Docker). No SaaS CRM (HubSpot, Attio, Salesforce, etc.).

**Full spec:** [automation-analytics.md](./automation-analytics.md) — architecture, Docker compose, scoring rules, GA4 events, env vars, E2E test plan.

#### G.1 Workflow

```
Submit inquiry
  → Lead score calculated (server rules)
  → POST webhook → n8n (Docker)
  → n8n: Contact + Company + Opportunity record
       (+ score, notes, automation status)
  → Internal notification
  → Confirmation email (Resend)
  → Qualification decision
       → Qualified → Cal.com booking
       → Not yet → resource recommendation
```

#### G.2 Implementation notes

- Prefer server-side scoring rules (budget, timeline, industry fit, decision maker) documented in [automation-analytics.md](./automation-analytics.md) (Lead Scoring section) — optional extract to `doc/lead-scoring.md` if rules grow large
- **Automation host:** n8n self-hosted via **Docker Compose only** — not n8n Cloud as the production host for this case study, and **not** any commercial CRM. Opportunity / contact / company records live in n8n (Data Tables or equivalent workflow store)
- Wire the consultation server action to an n8n webhook after score; keep Resend for transactional email (or call Resend from n8n — one source of truth, documented in the automation doc)
- **Calendar:** **Cal.com** only (embed or redirect after qualify) — no Calendly
- GA4: pageviews, case study engagement, consultation start / step complete / submit, booking complete
- Build / maintain workflows via Cursor **n8n MCP** (preferred) or n8n UI; `@n8n/cli` is optional and may require a paid API

#### G.3 Acceptance criteria

- [x] n8n running via Docker Compose; webhook reachable from the after app (staging) — local + Railway G0
- [x] End-to-end test: submit → score → n8n record → email → branch path (G1–G4; see [automation-analytics.md](./automation-analytics.md))
- [x] Qualified path offers **Cal.com**; unqualified path receives resources, not a dead end (G4)
- [x] Secrets only in env; no live keys in repo
- [x] No HubSpot / Attio / Salesforce (or other SaaS CRM) in the stack
- [x] No Calendly (or other scheduler) — Cal.com only
- [x] Operator runbook + backup + n8n-down fallback — [ops/n8n/RUNBOOK.md](../ops/n8n/RUNBOOK.md) (G6)

---

### Phase H — Motion, Polish, Pre-Flight & Launch

**Goal:** Ship agency-tier craft without strategy regression.

#### H.1 Motion budget (motivated only) — **done**

Shipped 3 intentional motions (Motion + `prefers-reduced-motion`):

1. [x] Hero entry — staggered brand → headline → support → CTAs ([`HomeHeroIntro`](../components/home/HomeHeroIntro.tsx))
2. [x] Island nav entry — header bar fade/slide on mount ([`Header`](../components/layout/Header.tsx))
3. [x] CTA press physics — `whileTap` scale on [`Button`](../components/shared/Button.tsx)

Scroll reveals on pillars / proof already via [`Reveal`](../components/shared/Reveal.tsx). GSAP sticky-stack deferred (not required for B2B calm).

#### H.2 design-taste-frontend Pre-Flight (mandatory) — **done**

Section 14 critical fails for this project (after Soft Structuralism site):

| Critical fail | Outcome |
| --- | --- |
| Em-dash anywhere visible | **Pass** — purged from user-facing strings under `content/`, `lib/` (UI + email), `components/`, `app/` |
| Hero overflow / &gt;4 hero text elements | **Pass** — HomeHero: brand, h1, support, CTAs |
| Eyebrow spam (&gt; ceil(sections/3)) | **Pass** on `/` (no section eyebrows mounted) |
| 3 equal feature cards as primary pattern | **Pass** — HomePillars asymmetric |
| Mid-page theme flip | **Pass with note** — dark full-bleed photo hero + light body = media plane; CtaBand is a brand-washed card on a light surface, not an inverted page theme |
| Duplicate CTA intents | **Pass** — primary label locked to `Book Strategy Consultation` |
| Div fake screenshots | **Pass** |
| Lucide-only / Inter default | **Pass** — Phosphor + DM Sans / Outfit |
| Scroll cue labels | **Pass** |

#### H.3 redesign-existing-projects + high-end pass — **done**

| Check | Outcome |
| --- | --- |
| Fix-priority items 1–7 | **Closed** — statuses updated in [`doc/redesign-audit.md`](./redesign-audit.md) §3 |
| Double-bezel / island nav / haptic CTAs | **Pass** — island nav + Button `whileTap` retained; DoubleBezel on HomeProcess, ConsultationForm shell, book-consultation aside |
| Absolute Zero | **Pass** — no Inter/Lucide/`h-screen`/`shadow-md` on live UI; brochure cards use border hover; premium ease on pillar/insight arrows; Submit `withArrow` |
| Mobile / `dvh` | **Pass** — asymmetric grids collapse via base single-column; heroes use `min-h-[100dvh]` |

#### H.4 Performance & a11y — **done**

| Check | Outcome |
| --- | --- |
| LCP via `next/image` priority | **Pass** — [`HomeHero`](../components/home/HomeHero.tsx) + [`CaseStudyDetail`](../components/case-studies/CaseStudyDetail.tsx); no competing home priorities |
| Animate only `transform` / `opacity` | **Pass** — consultation progress uses `scaleX`; HowWeOperate rule uses `scaleX` (no width animation) |
| WCAG AA + keyboard consultation | **Pass** — `--steel`/`--muted` AA-adjusted to `#5C6370`; step `aria-live` + title focus; server-error field focus; Select inline focus ring; MobileNav focus trap + restore |
| Lighthouse sanity (`next dev`, desktop) | **Pass** — a11y audits 19–22/22 pass (incl. color-contrast); CLS 0; LCP home ~3.9s / case ~0.8s / consult ~1.8s (home LCP inflated by local unminified JS; re-check on production in H.5) |

#### H.5 Launch — **done**

| Check | Outcome |
| --- | --- |
| `northline-after` production | **Live** — https://northline-after.vercel.app (Git deploy from `after`) |
| README URLs | **Updated** — after redesign framing + before/after table |
| Before vs after notes | **Linked** — [`doc/case-study-before-after.md`](./case-study-before-after.md) → strategy, plan, audit |
| Before site untouched | **Confirmed** — https://northline-before.vercel.app still brochure baseline; no deploys to `northline-before` |
| Production env | `NEXT_PUBLIC_SITE_URL`, Cal.com, n8n webhook + secret, `AUTOMATION_FALLBACK_EMAIL=true`, `GA_DEBUG=false`. Resend / GA measurement ID unset locally → Mode A email soft-logs until keys are added |

Deploy commit SHA recorded at end of this section after push.

#### H.5 Launch (checklist archive)

- [x] `northline-after` production deploy  
- [x] README URLs updated  
- [x] Case-study “before vs after” notes linked (strategy + this plan + audit)  
- [x] before site untouched  

---

## 4. Content Production Checklist (After)

- [ ] Brandkit boards + logo SVG + favicon  
- [ ] Positioning statement + homepage hero copy (outcome-led)  
- [ ] 4 pillar pages (problem / approach / deliverables / outcome)  
- [ ] 5 industry pages  
- [ ] 4+ case studies (full narrative schema)  
- [ ] Process page copy  
- [ ] About rewrite (maturity / partnership)  
- [ ] 4–6 insights (frameworks / guides — not tip spam)  
- [ ] Consultation microcopy + confirmation emails  
- [ ] Image set matching brandkit direction (workshops, strategy, product thinking)  
- [ ] Privacy / terms stubs  

---

## 5. Success Metrics → Implementation

| Strategy metric | How we measure |
| --- | --- |
| Higher consultation requests | Form starts + submits (GA + server log) |
| Higher % qualified leads | Score threshold rate; n8n opportunity status |
| Case study engagement | Scroll depth / time on `/case-studies/*` |
| Strategic content engagement | Insights time on page |
| Reduced manual qualification | % auto-routed to calendar vs human review |
| Booking completion | Calendar complete events |
| Better sales alignment | Opportunity notes + win/loss tagging in n8n records (ops process) |

---

## 6. Risk Register

| Risk | Mitigation |
| --- | --- |
| Pretty redesign without positioning shift | Gate every page against strategy messaging rules |
| Over-motion / Awwwards noise for B2B buyers | Dial motion ≤ 6; trust &gt; spectacle |
| high-end glass/purple defaults fighting brandkit | Brandkit palette is law; Soft Structuralism bias |
| Broken SEO from IA rename | Redirect map in Phase D; verify Search Console post-launch |
| Scope creep into client portal / calculators | Out of scope unless strategy amended |
| SaaS CRM creep (HubSpot etc.) | Stack lock: Docker n8n only; see [automation-analytics.md](./automation-analytics.md) |
| n8n Docker / webhook delay blocking launch | Ship qualification + email + scoring first; webhook adapter second |
| Accidental edits on `before` | Branch protection; separate Vercel project |

---

## 7. Milestone Summary

| Phase | Skill focus | Deliverable | Exit gate |
| --- | --- | --- | --- |
| **A** Brand Kit | brandkit | Boards, logo, tokens | Identity locked in repo |
| **B** Audit | redesign-existing-projects | Audit + preserve/replace + redirects draft | Diagnosis complete |
| **C** System & shell | taste + high-end | Tokens, nav, components | After chrome live |
| **D** Core pages | taste + high-end | Home, solutions, industries, process, about | Buyer IA live |
| **E** Proof | taste | Case studies + insights | Narrative proof live |
| **F** Conversion | taste | Qualification consultation UX | Guided inquire path |
| **G** Automation | n8n MCP + Docker ops | Score, n8n records, email, Cal.com branch, GA4 | E2E acquisition flow |
| **H** Polish & launch | all three design skills | Pre-flight, a11y, deploy | `northline-after` live |

---

## 8. Immediate Next Steps

1. Create `after` branch + `northline-after` Vercel project.  
2. **Phase A:** Run brandkit for Northline Creative; save boards under `brand/`; write `doc/brand-tokens.md`.  
3. **Phase B:** Produce `doc/redesign-audit.md` via redesign-existing-projects against the before codebase.  
4. Only then: Phase C shell with design-taste-frontend dials + high-end craft constrained by the kit.  
5. Execute D → H in order; do not skip qualification (F) or treat automation (G) as optional if the strategy case study requires it.

When implementation starts, treat **website-redesign-strategy.md** and **this plan** as paired constraints. The before [implementation-plan.md](./implementation-plan.md) remains the historical build record — do not reapply its “intentionally generic” rules to after work.
