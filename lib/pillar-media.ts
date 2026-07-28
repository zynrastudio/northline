import type { PillarSlug } from "@/content/types";

/** Dedicated Soft Structuralism photography per pillar — not home phase-d reuse. */
export const pillarImage: Record<PillarSlug, { src: string; alt: string }> = {
  strategy: {
    src: "/images/solutions/strategy-hero.jpg",
    alt: "Positioning thesis notebook and prioritized growth backlog on an editorial strategy desk",
  },
  "digital-experiences": {
    src: "/images/solutions/digital-experiences-hero.jpg",
    alt: "Annotated website study with wireframes and a single primary CTA marked",
  },
  "business-automation": {
    src: "/images/solutions/business-automation-hero.jpg",
    alt: "Qualification worksheet, scoring tiers, and CRM routing notes on a calm operators desk",
  },
  "growth-enablement": {
    src: "/images/solutions/growth-enablement-hero.jpg",
    alt: "Quarterly growth review materials with experiment notes and reporting folder",
  },
};
