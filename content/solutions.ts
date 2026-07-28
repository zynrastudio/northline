import type { PillarSlug, SolutionPillar } from "./types";

export const solutionPillars: SolutionPillar[] = [
  {
    slug: "strategy",
    title: "Strategy",
    tagline: "Decide where growth actually comes from.",
    problem:
      "Most B2B teams have more channels, tools, and opinions than they have clarity. Effort spreads thin. The website mirrors internal structure instead of how buyers decide. Campaigns launch without a shared definition of the customer worth acquiring — so spend amplifies an unresolved argument.",
    approach:
      "We start with positioning, buyer research, and a growth thesis written as a decision, not a slogan. We map how prospects move from first signal to qualified conversation, then decide what to build, what to retire, and which metric the engagement is accountable for. Clarity becomes the filter before creative or automation scales.",
    deliverables: [
      "Positioning and messaging framework",
      "Buyer journey and funnel map",
      "Priorities backlog tied to business goals",
      "Measurement plan for the metrics that matter",
    ],
    businessOutcome:
      "A shared, evidence-based plan that focuses spend on the customers worth acquiring.",
    legacyServices: ["branding"],
    relatedProjectSlugs: ["ledgerly-rebrand", "parcel-tech-site"],
    image: "/images/solutions/strategy-hero.jpg",
  },
  {
    slug: "digital-experiences",
    title: "Digital Experiences",
    tagline: "Websites that move buyers, not just impress them.",
    problem:
      "A polished site that does not convert is an expensive brochure. Interfaces look modern yet leave prospects unsure what to do next. Service pages dump features. Proof is buried. CTAs compete with each other. The experience impresses stakeholders and stalls buyers.",
    approach:
      "We design and build high-converting websites and product interfaces around the buyer journey — clear messaging, one primary path, fast performance, and accessible interaction from the first wireframe. Visual craft serves the argument. It does not replace it.",
    deliverables: [
      "High-converting marketing site design and build",
      "Product and interface UX for key flows",
      "Design system and component library",
      "Performance, accessibility, and SEO foundations",
    ],
    businessOutcome:
      "A digital experience that turns qualified traffic into booked conversations.",
    legacyServices: ["website-design", "ui-ux-design", "graphic-design"],
    relatedProjectSlugs: [
      "parcel-tech-site",
      "northpeak-education",
      "apex-manufacturing",
    ],
    image: "/images/solutions/digital-experiences-hero.jpg",
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    tagline: "Turn every inquiry into a qualified, routed opportunity.",
    problem:
      "Leads arrive as raw form fills. Teams qualify by hand, follow up late, and lose context between the website and the CRM. Open calendars feel generous and quietly transfer sorting cost onto sales. The site already collected signal — almost nobody uses it.",
    approach:
      "We connect the site to your CRM with lead scoring, routing, and automated follow-up so qualified prospects reach a calendar and everyone else gets useful resources. Fields earn their place only when they change the path. Sales opens a record that already knows why the person is there.",
    deliverables: [
      "Lead scoring and qualification logic",
      "CRM integration with opportunity creation",
      "Automated notifications and confirmations",
      "Routing to booking or nurture paths",
    ],
    businessOutcome:
      "Less manual qualification and faster response to the opportunities worth pursuing.",
    legacyServices: [],
    relatedProjectSlugs: ["parcel-tech-site", "apex-manufacturing"],
    image: "/images/solutions/business-automation-hero.jpg",
  },
  {
    slug: "growth-enablement",
    title: "Growth Enablement",
    tagline: "Compound the results after launch.",
    problem:
      "Launch is treated as the finish line. Content, experiments, and reporting stall, so the site stops improving the month after it ships. Teams restart with a new theme every quarter instead of compounding the thesis they already paid for.",
    approach:
      "We run ongoing content, experimentation, and reporting so the website keeps earning better customers over time — guided by the metrics set during strategy. Thought leadership, conversion tests, and quarterly reviews replace tip posts and vanity dashboards.",
    deliverables: [
      "Editorial and thought-leadership content",
      "Conversion experiments and iteration",
      "Analytics, dashboards, and reporting",
      "Quarterly growth reviews",
    ],
    businessOutcome:
      "A digital presence that improves quarter over quarter instead of aging.",
    legacyServices: ["content-creation", "digital-marketing"],
    relatedProjectSlugs: ["ledgerly-rebrand", "parcel-tech-site"],
    image: "/images/solutions/growth-enablement-hero.jpg",
  },
];

export function getPillarBySlug(slug: string): SolutionPillar | undefined {
  return solutionPillars.find((pillar) => pillar.slug === slug);
}

/** Map a legacy service slug to the pillar that absorbs it (for redirects). */
export function getPillarForService(serviceSlug: string): PillarSlug | undefined {
  return solutionPillars.find((pillar) =>
    pillar.legacyServices.includes(serviceSlug as never),
  )?.slug;
}
