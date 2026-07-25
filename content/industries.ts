import type { IndustryPage } from "./types";

export const industries: IndustryPage[] = [
  {
    slug: "professional-services",
    name: "Professional Services",
    understanding:
      "Firms in law, accounting, and consulting win on trust and referrals. The website has to earn confidence quickly and make it easy for a serious prospect to start a conversation.",
    challenges: [
      "Expertise is hard to differentiate on a page",
      "Long, relationship-led sales cycles",
      "Partners are protective of the brand and tone",
    ],
    tailoredSolutions: [
      { pillar: "strategy", note: "Positioning that separates the firm from lookalike competitors." },
      { pillar: "digital-experiences", note: "Credibility-first site with clear paths to consultation." },
      { pillar: "growth-enablement", note: "Thought leadership that compounds authority over time." },
    ],
    relatedProjectSlugs: ["ledgerly-rebrand"],
  },
  {
    slug: "saas",
    name: "SaaS & Software",
    understanding:
      "Software companies need the marketing site and product to tell one coherent story, turning traffic into demos and trials without adding sales friction.",
    challenges: [
      "Explaining a technical product to non-technical buyers",
      "Aligning marketing site and in-product experience",
      "Proving conversion impact to a metrics-driven team",
    ],
    tailoredSolutions: [
      { pillar: "digital-experiences", note: "Conversion-focused site and product UX for key flows." },
      { pillar: "business-automation", note: "Demo and trial routing wired into the CRM." },
      { pillar: "growth-enablement", note: "Experiments and reporting tied to pipeline." },
    ],
    relatedProjectSlugs: ["parcel-tech-site", "northpeak-education"],
  },
  {
    slug: "industrial",
    name: "Industrial & B2B Services",
    understanding:
      "Industrial buyers are practical and technical. The site needs to communicate capability and reliability, then make it simple to request a quote or a call.",
    challenges: [
      "Dense technical detail without a clear next step",
      "Sites that lag behind the quality of the work",
      "Long consideration cycles across multiple stakeholders",
    ],
    tailoredSolutions: [
      { pillar: "strategy", note: "Clarify capability and the customers worth pursuing." },
      { pillar: "digital-experiences", note: "Capability-led site with clear quote paths." },
      { pillar: "business-automation", note: "Quote requests scored and routed automatically." },
    ],
    relatedProjectSlugs: ["apex-manufacturing"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    understanding:
      "Manufacturers sell precision and dependability. Digital should reinforce that reputation and support both direct and channel sales without friction.",
    challenges: [
      "Legacy web presence that undersells the operation",
      "Complex product lines and specifications",
      "Sales collateral scattered across channels",
    ],
    tailoredSolutions: [
      { pillar: "digital-experiences", note: "Structured product and capability presentation." },
      { pillar: "business-automation", note: "Inbound inquiries qualified and routed to sales." },
      { pillar: "growth-enablement", note: "Ongoing content for trade and channel audiences." },
    ],
    relatedProjectSlugs: ["apex-manufacturing", "parcel-tech-site"],
  },
  {
    slug: "technology",
    name: "Technology",
    understanding:
      "Technology companies move fast and expect their partners to keep pace. The digital presence has to scale with the product and the go-to-market motion.",
    challenges: [
      "Rapidly evolving positioning and messaging",
      "Multiple audiences and product lines",
      "High expectations for design and performance",
    ],
    tailoredSolutions: [
      { pillar: "strategy", note: "Positioning that keeps up with the roadmap." },
      { pillar: "digital-experiences", note: "Fast, accessible, systematized site and UI." },
      { pillar: "growth-enablement", note: "Continuous iteration against clear metrics." },
    ],
    relatedProjectSlugs: ["parcel-tech-site", "northpeak-education"],
  },
];

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
  return industries.find((industry) => industry.slug === slug);
}
