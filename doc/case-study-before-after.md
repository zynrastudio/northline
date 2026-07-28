# Case study — before vs after

Northline Creative is a fictional B2B agency site used to demonstrate a full redesign: brochure “before” → Soft Structuralism “after” with qualification, automation, and analytics.

## Live URLs

| Version | Branch | Vercel project | URL |
| --- | --- | --- | --- |
| Before (frozen) | `before` | `northline-before` | https://northline-before.vercel.app |
| After (redesign) | `after` | `northline-after` | https://northline-after.vercel.app |

Keep the before URL permanent. Redesign work ships only on `after` / `northline-after`.

## What changed

| Area | Before | After |
| --- | --- | --- |
| Positioning | Full-service creative agency | Strategic B2B growth partner (“Clarity builds confidence.”) |
| IA | Services / portfolio / blog / contact | Solutions, industries, case studies, process, insights, book consultation |
| Design system | Generic brochure cards, Inter-leaning defaults | Soft Structuralism: Outfit + DM Sans, Phosphor, island nav, DoubleBezel, brand teal |
| Conversion | Simple contact form | Multi-step consultation, lead scoring, Cal.com branch, Resend Mode A |
| Automation | Email only | Self-hosted n8n (Railway) intake + GA4 consultation events |

## Source docs

- Strategy: [website-redesign-strategy.md](./website-redesign-strategy.md)
- Implementation (Phases A–H): [redesign-implementation-plan.md](./redesign-implementation-plan.md)
- Audit / diagnosis: [redesign-audit.md](./redesign-audit.md)
- Automation + analytics: [automation-analytics.md](./automation-analytics.md)
- Brand tokens: [brand-tokens.md](./brand-tokens.md)

## How to compare

1. Open the before site and note service-org IA, equal card grids, and contact-as-CTA.
2. Open the after site and walk home → case study → book consultation.
3. Read the strategy and audit for the “why”; the implementation plan for what shipped.
