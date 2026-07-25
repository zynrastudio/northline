import { industries } from "./industries";
import { processSteps } from "./process";
import { solutionPillars } from "./solutions";

/** Homepage copy and media locks for Phase D.2 */
export const homeContent = {
  hero: {
    brand: "NORTHLINE",
    headline: "Strategic digital experiences that win better customers.",
    support: "We partner with B2B teams to turn clarity into pipeline.",
    image: "/images/home/phase-d-photo-01-hero-workshop.png",
    imageAlt:
      "Northline team in a strategy workshop reviewing plans at a white table",
  },
  positioning: {
    headline: "Clarity builds confidence.",
    body: "Northline is a Strategic B2B Growth Partner, focused on measurable outcomes, not deliverables.",
    image: "/images/home/phase-d-photo-02-path-meridian.png",
    imageAlt:
      "Architectural corridor opening to a calm horizon, suggesting a clear path forward",
  },
  pillars: {
    headline: "Four pillars. One growth system.",
    featuredImage: "/images/home/phase-d-photo-01-hero-workshop.png",
    featuredImageAlt:
      "Collaborative strategy session with plans spread across the table",
  },
  proof: {
    headline: "Proof in the work.",
    body: "Outcome-led engagements for operators who need direction, not decoration.",
    items: [
      {
        slug: "apex-manufacturing",
        title: "Apex Manufacturing",
        industry: "Manufacturing",
        outcome:
          "Clarified capability and quote paths so technical buyers could move with less sales friction.",
        image: "/images/home/phase-d-photo-05-industry-precision.png",
        imageAlt: "Industrial architectural interior with precise structural lines",
      },
      {
        slug: "parcel-tech-site",
        title: "Parcel Tech",
        industry: "Technology",
        outcome:
          "Rebuilt the corporate site around the buyer journey so demos start from a clearer story.",
        image: "/images/home/phase-d-photo-04-case-proof.png",
        imageAlt: "Team reviewing printed case materials in cool daylight",
      },
    ],
  },
  industries: {
    headline: "Built for B2B operators.",
    image: "/images/home/phase-d-photo-05-industry-precision.png",
    imageAlt: "Soft architectural structure suggesting industrial precision",
    items: industries.map((industry) => ({
      name: industry.name,
      href: `/industries/${industry.slug}`,
      mark: industry.name
        .split(/[\s&]+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    })),
  },
  process: {
    headline: "How engagements actually run.",
    image: "/images/home/phase-d-photo-03-whiteboard-strategy.png",
    imageAlt: "Strategy whiteboard with frameworks and decision notes",
    steps: processSteps.slice(0, 3),
  },
  insights: {
    headline: "Frameworks before contact.",
    featured: {
      category: "Thought Leadership",
      title: "The GTM clarity that compounds",
      body: "Diagnose, position, and prioritize before you reach out.",
      href: "/insights/gtm-clarity-that-compounds",
    },
    image: "/images/home/phase-d-photo-06-insight-desk.png",
    imageAlt: "Editorial desk with strategy notebooks and cool daylight",
    items: [
      {
        category: "Frameworks",
        title: "Why most B2B launches underperform",
        body: "A pre-launch clarity check before spend scales the wrong message.",
        href: "/insights/why-most-b2b-launches-underperform",
      },
      {
        category: "Guides",
        title: "Qualify before the calendar",
        body: "How routing and scoring keep sales focused on fit.",
        href: "/insights/qualify-before-the-calendar",
      },
    ],
  },
  cta: {
    title: "Ready for a clearer growth path.",
    description: "Book a strategy consultation and map your next move.",
  },
} as const;

export const homePillars = solutionPillars.map((pillar) => ({
  slug: pillar.slug,
  title: pillar.title,
  body: pillar.businessOutcome,
  href: `/solutions/${pillar.slug}`,
}));
