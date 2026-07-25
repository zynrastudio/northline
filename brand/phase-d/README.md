# Phase D — Homepage imagery

**Status:** Production photography + homepage section refs generated  
**Palette:** Soft Structuralism (locked in Phase A)  
**Dials:** `DESIGN_VARIANCE 7` · `MOTION_INTENSITY 6` · `VISUAL_DENSITY 3`

---

## Design read

B2B consulting homepage for procurement-minded growth buyers; Soft Structuralism + editorial-architectural; light theme lock with sole teal accent `#1A5F6B`.

---

## Production photography

Art-directed stills (no UI). Use as full-bleed heroes, bezel media, and section crops.

| File | Role |
| --- | --- |
| `photography/phase-d-photo-01-hero-workshop.png` | Hero / collaboration atmosphere |
| `photography/phase-d-photo-02-path-meridian.png` | Brand metaphor / positioning visual |
| `photography/phase-d-photo-03-whiteboard-strategy.png` | Process / strategy frameworks |
| `photography/phase-d-photo-04-case-proof.png` | Case study / proof teaser |
| `photography/phase-d-photo-05-industry-precision.png` | Industries / industrial precision |
| `photography/phase-d-photo-06-insight-desk.png` | Insights / thought leadership |

Direction continuity: also see `brand/image-direction/workshop.png` and `path-meridian.png` from Phase A.

**Avoid in crops:** laptop-as-hero, purple UI glow, cream+brass still-life, pill overlays on photos.

---

## Homepage section references (8)

One horizontal UI comp per D.2 section. Implement against these, not against generic SaaS templates.

| # | File | Section | Layout family |
| --- | --- | --- | --- |
| 1 | `homepage/phase-d-home-01-hero.png` | Hero | Full-bleed image + bottom/left text stack (island nav) |
| 2 | `homepage/phase-d-home-02-positioning.png` | Positioning / promise | Editorial split + path image |
| 3 | `homepage/phase-d-home-03-pillars.png` | Solution pillars | Asymmetric 4-cell bento |
| 4 | `homepage/phase-d-home-04-proof.png` | Proof teaser | Two large outcome cards |
| 5 | `homepage/phase-d-home-05-industries.png` | Who we serve | Wordmark / mark strip |
| 6 | `homepage/phase-d-home-06-process.png` | Process glimpse | Image + verb-noun beats |
| 7 | `homepage/phase-d-home-07-insights.png` | Insight teaser | Featured + list editorial |
| 8 | `homepage/phase-d-home-08-cta.png` | Consultation CTA band | Teal band + single CTA intent |

### Hero copy lock (from refs)

- Brand signal: **NORTHLINE**
- Headline: Strategic digital experiences that win better customers.
- Support (≤20 words): We partner with B2B teams to turn clarity into pipeline.
- Primary CTA: Book Strategy Consultation
- Secondary: View case studies

### Pre-flight notes for implementation

- Brand test: remove nav → still reads Northline (wordmark + meridian visual)
- Max 1 eyebrow per 3 sections
- Zero em-dashes in visible copy
- One CTA intent label sitewide for consultation
- Pill buttons + 12px media bezels (Phase C shape lock)
- No stats / logo wall / scroll cues inside hero

---

## Implementation

Homepage wired in `app/page.tsx` + `components/home/Home*.tsx` using `content/home.ts`.  
Public media: `public/images/home/`.

## Next

Continue D.3–D.5 routes (pillar / industry / process / about detail pages) and Phase D redirects.
