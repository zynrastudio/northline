# Northline Creative — Redesign Audit (Phase B)

**Status:** Complete  
**Branch:** `after`  
**Mode:** Redesign — Overhaul  
**Skill:** `.agents/skills/redesign-existing-projects` (Scan → Diagnose; Fix deferred to Phases C–H)  
**Sources:** [website-redesign-strategy.md](./website-redesign-strategy.md) · [redesign-implementation-plan.md](./redesign-implementation-plan.md) · [brand-tokens.md](./brand-tokens.md) · [redesign-opportunities.md](./redesign-opportunities.md)

**Design read:** Redesign overhaul of a B2B agency marketing site for procurement-minded growth buyers; Soft Structuralism + editorial-architectural language; brandkit tokens already locked in Phase A.

**Dials (carry forward):** `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 6` · `VISUAL_DENSITY 3`

---

## 1. Scan summary (current baseline)

| Area | State on `after` |
| --- | --- |
| Framework | Next.js 16.2 App Router, React 19, RSC-first |
| Styling | Tailwind 4 + CSS variables (**Phase A teal kit wired**) |
| Fonts | Outfit (display) + DM Sans (body) — stand-ins for Neue Montreal / Satoshi |
| Routes | Still **before IA**: `/`, `/services`, `/portfolio`, `/about`, `/blog`, `/contact` (+ dynamic slugs) |
| Lead path | Resend email; fields: name, company, email, phone, message (+ honeypot) |
| Motion | Minimal; Button has press/hover cubic-bezier; no scroll choreography |
| CMS | Local typed `content/*.ts` (no headless CMS, no MDX) |
| Deps | `next`, `react`, `resend` only — no Motion/GSAP/icon lib yet |

### Phase A already applied (do not redo)

- Tokens: ink / surface / steel / teal `#1A5F6B` in `app/globals.css`
- Logo: N + meridian mark, favicon, wordmark under `brand/logo/` + `public/`
- Tagline lock in `content/site.ts`: “Clarity builds confidence.”
- Primary CTA label: “Book Strategy Consultation” (still points at `/contact`)
- Brand kit boards + image direction under `brand/`

### Still brochure underneath

Tokens and CTA labels changed; **layout, IA, schemas, and most copy** remain the before site.

---

## 2. Diagnose (redesign-existing-projects audit)

### Typography

| Finding | Severity | Notes |
| --- | --- | --- |
| Display font underused | Medium | Outfit loaded; most headings still use default `font-sans` weight/scale |
| Limited weight hierarchy | Medium | Mostly 400/600; little Medium/SemiBold nuance |
| Eyebrow spam | High | `uppercase tracking-wide text-brand` on nearly every section (`HomeHero`, `PageHero`, `SectionHeading`, cards, articles) — fails taste-skill “max 1 eyebrow per 3 sections” |
| Brand underpowered in hero | High | Company name is a small eyebrow; H1 is tagline — fails brand-test |
| Body measure OK-ish | Low | Some paragraphs lack `max-w-[65ch]` discipline |

**Fix priority item 1 (fonts):** Partially done in A. Phase C must apply `--font-display` to display scale and retire eyebrow spam.

### Color and surfaces

| Finding | Severity | Notes |
| --- | --- | --- |
| Brochure-blue leftovers | High | `CtaBand.tsx`: `text-blue-100`, `hover:bg-blue-50` |
| Flat alternating bands | Medium | `bg-white` / `bg-surface` card slabs; little texture/atmosphere |
| Hardcoded `bg-white` | Medium | Cards/chrome ignore `surface-elevated` token in places |
| Theme consistency | OK | Light theme lock matches brandkit — keep |

**Fix priority item 2 (palette):** Mostly done in A. Sweep blue utilities + unify surfaces in C.

### Layout

| Finding | Severity | Notes |
| --- | --- | --- |
| Equal 3-col card grids | High | Home services, portfolio, blog, team, about values — generic AI layout #1 |
| Inset split heroes | High | `HomeHero` / `PageHero` — text + rounded media card; not full-bleed |
| Card-heavy chrome | High | Border + white fill + shadow on almost every teaser |
| Centered brochure rhythm | High | Eyebrow → heading → blurb → cards → CTA band repeated every page |
| Container | Low | `max-w-6xl` present — keep, possibly widen to ~1400px in C |
| `h-screen` usage | OK | Prefer confirm `min-h-[100dvh]` on any full-viewport heroes in C |

### Interactivity and states

| Finding | Severity | Notes |
| --- | --- | --- |
| Thin card hover | Medium | Mostly `hover:shadow-md` + title color |
| No consulting-grade motion | Medium | No entry reveals, island nav, magnetic CTA (dial 6 needs motivated motion in C/H) |
| Contact states | OK | Inline errors, success/status roles present — extend for multi-step later |
| Loading skeletons | Missing | None for form submit beyond disabled button |
| Focus / reduced-motion | Preserve | Global `:focus-visible`, `prefers-reduced-motion` kill-switch |

### Content and messaging

| Finding | Severity | Notes |
| --- | --- | --- |
| Six equal services | High | Not solution pillars; nav + footer reinforce service org chart |
| Portfolio = visual gallery | High | Overview + services + gallery; no Challenge → Strategy → Outcome |
| Blog = tip/update voice | High | Not insights / frameworks / thought leadership |
| Copy voice split | High | `site.ts` already B2B partner; `about.ts` + services still “full-service creative agency” |
| Generic agency phrases | Medium | “modern businesses”, “professional and polished”, “Learn more →” |
| CTA secondary mismatch | Medium | `CtaBand` still “View Portfolio” → should become Explore Case Studies |

### Component / iconography patterns

| Finding | Severity | Notes |
| --- | --- | --- |
| Identical card components | High | `ServiceCard` / `ProjectCard` / `BlogCard` share brochure DNA |
| Floating badge on service image | Medium | Pill overlay anti-pattern |
| Avatar circles only | Low | `TestimonialCard` `rounded-full` |
| No Phosphor/etc. yet | Low | Install one icon family in C; avoid Lucide default |
| Create Next App SVGs in `public/` | Low | Delete dead assets |

### Strategic omissions (from opportunities + strategy)

| Gap | Target phase |
| --- | --- |
| Buyer IA (Solutions, Industries, Case Studies, Process, Insights, Book Consultation) | D |
| Industry pages | D |
| Qualification form fields | F |
| Lead scoring + CRM + calendar branch | G |
| Outcome-led case studies | E |
| Privacy / terms links | C/H |
| Custom 404 | H |

### Accessibility wins to preserve

- Skip link → `#main-content`
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `article`, `figure`)
- Focus-visible rings; form `aria-invalid` / `aria-describedby` / live regions
- MobileNav: Escape, scroll lock, `aria-expanded`
- Decorative vs meaningful `alt` discipline
- Honeypot + rate limit on contact

---

## 3. Fix priority (ordered — do not skip ahead)

Matches redesign-existing-projects + implementation plan. **Phase B does not execute fixes.**

| # | Upgrade | Phase | Status |
| ---: | --- | --- | --- |
| 1 | Font swap → brandkit type | A → C polish | A done; apply display scale in C |
| 2 | Color palette cleanup | A → C sweep | A done; remove blue leftovers in C |
| 3 | Hover / active / focus states | C | Pending |
| 4 | Layout & spacing rhythm | C–D | Pending |
| 5 | Replace generic components | C–E | Pending |
| 6 | Loading / empty / error (consultation) | F | Pending |
| 7 | Typography scale polish | C / H | Pending |

**Do not start Phase C UI work until this audit is accepted** (exit gate B.5).

---

## 4. Preserve vs replace

| Preserve | Replace / evolve |
| --- | --- |
| Next.js 16 App Router + React 19 + TypeScript | Page compositions, hero model, card system |
| Tailwind CSS 4 + CSS variable pattern | Utility leftovers (`blue-*`), card-default styling |
| Phase A brand tokens, logo, favicon, tagline | — (locked) |
| Local typed content under `content/` | Schemas: Service→Pillar, Project→CaseStudy, Blog→Insight; copy voice |
| Resend + `lib/email.ts` + rate limit + honeypot | Form field set, multi-step UX, CRM/scoring adapters |
| `lib/seo.ts`, `sitemap.ts`, `robots.ts`, GA helper | Titles, OG, sitemap entries for new routes |
| A11y foundations listed above | Expand to island nav, multi-step form, motion |
| `Container`, `Button` primitive ideas | Island nav, button-in-button, secondary CTA labels |
| Project/blog seed *topics* as raw material | Rewrite into narrative case studies / strategic insights |
| Env pattern (`.env.example`) | Add CRM / calendar / scoring vars in G |

**Never change silently without explicit approval:** production `before` branch/URL, legal copy once written, analytics event *names* once dashboards depend on them (version carefully).

---

## 5. Redirect / URL migration plan

When Phase D lands new IA, add permanent redirects (Next.js `redirects` in config or middleware). Keep old URLs alive for SEO and shared links.

### Primary route map

| Before (keep as source) | After (destination) | Type |
| --- | --- | --- |
| `/services` | `/solutions` | 308 |
| `/portfolio` | `/case-studies` | 308 |
| `/blog` | `/insights` | 308 |
| `/contact` | `/book-consultation` | 308 |
| `/about` | `/about` | Same path; rewrite content only |
| `/` | `/` | Same path; full recomposition |

### Service → pillar (many-to-one)

Legacy service detail URLs redirect to the pillar that absorbs them:

| Before | After |
| --- | --- |
| `/services/website-design` | `/solutions/digital-experiences` |
| `/services/ui-ux-design` | `/solutions/digital-experiences` |
| `/services/branding` | `/solutions/strategy` |
| `/services/content-creation` | `/solutions/growth-enablement` |
| `/services/digital-marketing` | `/solutions/growth-enablement` |
| `/services/graphic-design` | `/solutions/digital-experiences` |

*(Adjust mapping in D if content strategy assigns branding under a different pillar; document any change here.)*

### Portfolio → case studies

| Before | After |
| --- | --- |
| `/portfolio/[slug]` | `/case-studies/[slug]` |

**Slug policy:** Prefer **keeping the same `[slug]`** on first migration so redirects are path-prefix only. Rename slugs only with an extra redirect row.

### Blog → insights

| Before | After |
| --- | --- |
| `/blog/[slug]` | `/insights/[slug]` |

Same slug-stability policy as portfolio.

### New routes (no before equivalent)

| After route | Notes |
| --- | --- |
| `/industries` | Index |
| `/industries/[slug]` | professional-services, saas, industrial, manufacturing, technology |
| `/process` | How we work |
| `/solutions/[slug]` | strategy, digital-experiences, business-automation, growth-enablement |

### Implementation checklist (Phase D)

- [ ] Add redirects array (or `next.config.ts` `redirects`)
- [ ] Update `lib/nav.ts` to after IA
- [ ] Update `app/sitemap.ts` to emit **after** URLs only (canonical)
- [ ] Update internal links (Header, Footer, cards, CTAs)
- [ ] Smoke-test each before URL → after destination
- [ ] Confirm `northline-before` production untouched

---

## 6. Content schema evolution (for Phases D–E)

| Current entity | Evolve to | Required fields (additive) |
| --- | --- | --- |
| `Service` (6) | `SolutionPillar` (4) | `problem`, `approach`, `deliverables[]`, `businessOutcome` |
| `Project` | `CaseStudy` | `challenge`, `strategy`, `execution`, `businessOutcome`, `lessonsLearned`, `pillarSlugs[]` |
| `BlogPost` | `Insight` | `category` (framework / guide / industry / thought-leadership); richer body OK |
| — | `Industry` | `slug`, `understanding`, `challenges[]`, `relatedCaseSlugs[]`, `tailoredSolutions[]` |
| `SiteSettings` | extend | primary/secondary/supporting CTA labels + hrefs |
| Contact payload | Qualification | company, industry, budget, timeline, goals, scope, decisionMaker, challenges |

Keep old files readable during migration (adapter helpers) or rename with a single content pass in D/E — prefer one clean cut on `after` once redirects exist.

---

## 7. Success metrics → instrumentation map

| Strategy metric | Current | Needed |
| --- | --- | --- |
| Consultation requests | `generate_lead` on simple form | Keep event; add `consultation_start`, `consultation_step_complete`, `consultation_submit` |
| % qualified leads | None | Server score + CRM stage; GA `lead_qualified` / `lead_nurture` |
| Case study engagement | Pageviews only | Engagement time / scroll on `/case-studies/*` |
| Strategic content engagement | Blog pageviews | Same for `/insights/*` |
| Manual qualification reduction | None | Ops: auto-route rate to calendar vs human review |
| Booking completion | None | `calendar_booking_complete` (Phase G) |
| Sales alignment | None | CRM notes / win-loss (ops, not web-only) |

Do not rename `generate_lead` without updating any existing GA reports; prefer additive events.

---

## 8. Component debt → after inventory

| Keep / adapt | Retire or heavily rewrite |
| --- | --- |
| `Button` (extend variants) | Equal `ServiceCard` grid as primary pattern |
| `Container` | Inset `PageHero` / `HomeHero` as default hero |
| `ContactForm` → evolve | `CtaBand` blue leftovers + “View Portfolio” |
| `GoogleAnalytics` | Floating image pills/badges |
| SEO helpers | Tip-blog-only `BlogCard` presentation |

**New (Phases C–F):** Island `Header`, `Reveal` islands, `SolutionPillar`, `CaseStudyNarrative`, `IndustryPanel`, `ProcessSteps`, multi-step `ConsultationForm`, legal footer links.

---

## 9. Risk notes for later phases

| Risk | Mitigation |
| --- | --- |
| Token swap without layout change looks “half redesigned” | Phase C shell + hero before shipping public after URL |
| Redirect mistakes | Checklist in §5; test matrix before launch |
| Over-motion for B2B | Stick to dial 6; motivated motion only |
| Copy left in agency voice | Content pass tied to D/E exit gates |
| Editing `before` by mistake | Work only on `after`; separate Vercel project |

---

## 10. Phase B acceptance

- [x] `doc/redesign-audit.md` completed with diagnose list
- [x] Preserve / replace table agreed (this doc §4)
- [x] Redirect / URL migration plan drafted (this doc §5)
- [x] No Phase C UI work started until A + B exit gates pass

**Phase B complete.** Next: [Phase C — Design System & Shell](./redesign-implementation-plan.md#phase-c--design-system--shell-skills-design-taste-frontend--high-end-visual-design).
