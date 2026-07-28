# Northline Creative — Brand Tokens

**Status:** Locked (Phase A)  
**Source boards:** `brand/brand-kit/`  
**Branch:** `after`

---

## Brand strategy

| Lens | Lock |
| --- | --- |
| Category | Strategic B2B growth partner |
| Audience | Founders, marketing leaders, ops leads |
| Personality | Confident, restrained, precise, sophisticated |
| Promise | Clarity and trust before commitment |
| Core metaphor | **Northline** = navigational meridian / true-north path from problem to growth |
| Logo logic | Geometric **N** monogram + thin meridian crosshair (horizontal horizon + vertical north path) |
| Tagline | **Clarity builds confidence.** |
| Visual mode | Soft Structuralism + editorial-architectural; **light theme lock** for marketing |
| Avoid | Purple AI gradients, cream+brass luxury cliché, saturated brochure blue, stock laptop heroes |

---

## Color

One accent. Cool gray family. Saturation kept restrained.

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#14161A` | Primary text, logo fill (light surfaces) |
| `surface` | `#F4F5F7` | Page background |
| `surface-elevated` | `#FFFFFF` | Raised panels when needed |
| `steel` | `#5C6370` | Secondary text, hairlines, captions (AA-adjusted from `#6B7280` for ≥4.5:1 on `surface`) |
| `teal` / `brand` | `#1A5F6B` | Sole accent: CTAs, meridian lines, focus, selection |
| `teal-deep` | `#144C56` | Hover / pressed accent |
| `teal-subtle` | `#E6F0F2` | Soft accent wash (selection, chips) |
| `border` | `#D8DCE3` | Dividers on surface |

**Do not introduce a second accent.** Teal is the only chromatic brand color.

---

## Typography

### Intended (from brand kit)

| Role | Face | Weight |
| --- | --- | --- |
| Display / headlines | Neue Montreal | Medium (500) |
| Body / UI | Satoshi | Regular (400), Medium (500) |

### Implementation (until licensed files are self-hosted)

| Role | `next/font` stand-in | CSS variable |
| --- | --- | --- |
| Display | Outfit | `--font-display` |
| Body / UI | DM Sans | `--font-sans` |

Rules:

- No Inter, Roboto, Arial, or Source Sans on the after site
- No serif (kit is grotesk-only)
- Large display: tighter tracking; labels: wider tracking
- Sentence case for headlines in product UI; wordmark stays `NORTHLINE` / `CREATIVE` as lockups

---

## Logo

Files in `brand/logo/` (mirrored to `public/brand/` and `public/images/brand/` for the after site):

| File | Use |
| --- | --- |
| `mark.svg` | Icon / app mark on light |
| `mark-on-dark.svg` | Icon on charcoal / dark panels |
| `wordmark.svg` | Nav / footer lockup |
| `favicon.svg` | Favicon / app icon tile |

**Clearspace:** minimum padding = width of the vertical meridian stroke × 4 around the mark.  
**Do not** stretch, add gradients, enclose in unapproved shapes, or recolor the meridian away from teal.

---

## Shape

Documented mixed system (shape consistency lock):

| Token | Value | Use |
| --- | --- | --- |
| `--radius-control` | `0.5rem` (8px) | Inputs, small chips |
| `--radius-button` | `999px` | Primary / secondary CTAs (pill) |
| `--radius-panel` | `0.75rem` (12px) | Media shells / double-bezel outer |
| `--radius-island` | `999px` | Floating nav island |

Phase C shell refs: `brand/phase-c/`.

---

## Motion (notes for later phases)

- Easing preference: `cubic-bezier(0.32, 0.72, 0, 1)` or spring equivalents
- Animate `transform` / `opacity` only
- Honor `prefers-reduced-motion`
- Budget: purposeful entry + hover feedback + ≤1 scroll-driven narrative moment until Phase H

---

## Imagery

References: `brand/image-direction/`

| Asset | Direction |
| --- | --- |
| `workshop.png` | Strategy sessions, whiteboards, collaboration - cool grade |
| `path-meridian.png` | Architectural sightlines / path metaphor - empty or distant figure |

Keywords: workshops, collaboration, strategy rooms, architectural precision, cool daylight, restrained teal accents in props.  
Avoid: generic laptop heroes, neon glass offices, purple UI screenshots, beige craft still-life.

---

## CTA copy lock

Primary intent label (sitewide): **Book Strategy Consultation**  
Secondary: **Explore Case Studies**  
Supporting: **See How We Work**

---

## Generated boards

| File | Purpose |
| --- | --- |
| `brand/brand-kit/northline-brandkit-3x3.png` | Full 3×3 identity system |
| `brand/brand-kit/northline-brandkit-2x3.png` | 2×3 stakeholder mini-deck |
| `brand/brand-kit/northline-app-digital-header.png` | Frontend digital application reference (imagegen) |

---

## Acceptance (Phase A)

- [x] Brand-kit images stored under `brand/`
- [x] Logo usable as icon, wordmark, favicon
- [x] Tokens documented here and wired in `app/globals.css`
- [x] One accent (`#1A5F6B`) locked
- [x] Metaphor + mark logic answerable from this file
