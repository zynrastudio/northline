import type { PillarSlug } from "@/content/types";

/** Phase D photography assigned per pillar (kit image-direction). */
export const pillarImage: Record<PillarSlug, { src: string; alt: string }> = {
  strategy: {
    src: "/images/home/phase-d-photo-03-whiteboard-strategy.png",
    alt: "Strategy whiteboard with positioning frameworks and decision notes",
  },
  "digital-experiences": {
    src: "/images/home/phase-d-photo-01-hero-workshop.png",
    alt: "Team reviewing interface and journey plans in a strategy workshop",
  },
  "business-automation": {
    src: "/images/home/phase-d-photo-04-case-proof.png",
    alt: "Operators reviewing routed pipeline and qualification results",
  },
  "growth-enablement": {
    src: "/images/home/phase-d-photo-06-insight-desk.png",
    alt: "Editorial desk with growth playbooks and reporting notes",
  },
};
