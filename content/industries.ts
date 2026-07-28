import type { IndustryPage } from "./types";

export const industries: IndustryPage[] = [
  {
    slug: "professional-services",
    name: "Professional Services",
    tagline: "Trust first. Conversation second.",
    understanding:
      "Firms in law, accounting, advisory, and consulting win on trust and referrals. The website is rarely the first touch, but it is often the moment a serious prospect decides whether you feel like the right room. Digital has to earn confidence quickly, protect partner tone, and make it easy to start a conversation without sounding like a lead factory.",
    approach:
      "We start with positioning that separates the firm from lookalike competitors, then build a credibility-first presence: proof within reach, partners and practices explained without jargon soup, and a consultation path that respects how relationship-led deals actually form. Thought leadership compounds authority instead of shipping tip posts that dilute the brand.",
    buyerPromise:
      "A stranger should know who you serve, why you are different, and how to begin, in one screen.",
    challenges: [
      "Expertise is hard to differentiate on a page without sounding generic",
      "Long, relationship-led sales cycles with multiple stakeholders",
      "Partners are protective of tone and resistant to marketing theater",
      "Proof lives in decks and referrals, not on the site where buyers look",
    ],
    tailoredSolutions: [
      {
        pillar: "strategy",
        note: "Positioning and messaging that separate the firm from lookalike competitors, decided with partners, not for them.",
      },
      {
        pillar: "digital-experiences",
        note: "Credibility-first site with clear practice areas and a calm path to consultation.",
      },
      {
        pillar: "growth-enablement",
        note: "Thought leadership and content cadence that compounds authority over quarters, not weeks.",
      },
    ],
    icon: "/images/industries/professional-services.svg",
    relatedProjectSlugs: ["ledgerly-rebrand"],
  },
  {
    slug: "saas",
    name: "SaaS & Software",
    tagline: "One story from site to product.",
    understanding:
      "Software companies need the marketing site and product to tell one coherent story. Traffic that cannot become a qualified demo or trial is expensive noise. Buyers toggle between technical evaluators and commercial stakeholders, both need a path that does not force sales to re-explain the product on every call.",
    approach:
      "We lock a growth thesis around qualified conversations, then align site narrative, key product surfaces, and routing so demos and trials start from clarity. Experiments and reporting stay tied to pipeline metrics, demo-to-opportunity, activated trials, not vanity sessions.",
    buyerPromise:
      "Marketing and product should not contradict each other before the first call.",
    challenges: [
      "Explaining a technical product to mixed technical and commercial buyers",
      "Marketing site and in-product experience drifting into different stories",
      "Proving conversion impact to a metrics-driven leadership team",
      "Demo volume celebrated without qualification criteria",
    ],
    tailoredSolutions: [
      {
        pillar: "digital-experiences",
        note: "Conversion-focused site and product UX for the journeys that actually create pipeline.",
      },
      {
        pillar: "business-automation",
        note: "Demo and trial routing scored and wired into the CRM with opportunity context.",
      },
      {
        pillar: "growth-enablement",
        note: "Experiment backlog and reporting tied to pipeline, not traffic applause.",
      },
    ],
    icon: "/images/industries/saas.svg",
    relatedProjectSlugs: ["parcel-tech-site", "northpeak-education"],
  },
  {
    slug: "industrial",
    name: "Industrial & B2B Services",
    tagline: "Capability over mood.",
    understanding:
      "Industrial and B2B service buyers are practical and technical. They are not looking for cinematic mood boards. They need to know you can deliver, capacity, process, proof, then need a clean way to request a quote or a call across a long consideration cycle with multiple stakeholders.",
    approach:
      "We treat the site as a capability instrument. Positioning names who you serve well. Information architecture makes dense offerings findable. Quote and inquiry paths collect what sales needs so humans stop being the parser. Visual language stays restrained on purpose, Soft Structuralism over spectacle.",
    buyerPromise:
      "Capability should read as calm structure, with a next step that respects how these deals form.",
    challenges: [
      "Dense technical detail without a clear next step",
      "Sites that lag behind the quality of the work on the floor",
      "Long consideration cycles across engineering, ops, and procurement",
      "Free-form email inboxes that push clarity cost onto sales",
    ],
    tailoredSolutions: [
      {
        pillar: "strategy",
        note: "Clarify capability and the customers worth pursuing before creative scales.",
      },
      {
        pillar: "digital-experiences",
        note: "Capability-led site with structured offerings and clear quote paths.",
      },
      {
        pillar: "business-automation",
        note: "Quote and inquiry requests scored and routed automatically.",
      },
    ],
    icon: "/images/industries/industrial.svg",
    relatedProjectSlugs: ["apex-manufacturing"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Precision on the floor. Clarity online.",
    understanding:
      "Manufacturers sell precision and dependability. Digital should reinforce that reputation, not undersell it with a brochure that feels softer than the plant. Complex product lines, specifications, and channel partners need structure, and inbound should arrive with enough context for sales to act.",
    approach:
      "We rebuild the presence around capability and quote discipline: structured product presentation, aligned sales collateral, and inbound qualification that reduces time unpacking free-form emails. Ongoing content supports trade and channel audiences without tip-blog filler.",
    buyerPromise:
      "The site should feel as disciplined as the operation it represents.",
    challenges: [
      "Legacy web presence that undersells the operation",
      "Complex product lines and specifications buried in PDFs",
      "Sales collateral scattered across channels and events",
      "Inbound that arrives without the fields sales needs to qualify",
    ],
    tailoredSolutions: [
      {
        pillar: "digital-experiences",
        note: "Structured product and capability presentation that buyers can navigate without a scavenger hunt.",
      },
      {
        pillar: "business-automation",
        note: "Inbound inquiries qualified and routed to the right sales path.",
      },
      {
        pillar: "growth-enablement",
        note: "Ongoing content for trade and channel audiences tied to real demand.",
      },
    ],
    icon: "/images/industries/manufacturing.svg",
    relatedProjectSlugs: ["apex-manufacturing", "parcel-tech-site"],
  },
  {
    slug: "technology",
    name: "Technology",
    tagline: "Pace without losing the thesis.",
    understanding:
      "Technology companies move fast and expect partners to keep pace. Positioning evolves with the roadmap. Multiple audiences and product lines compete for attention. The digital presence has to scale with the product and the go-to-market motion without restarting first principles every quarter.",
    approach:
      "We install clarity as an operating system: diagnose, position, prioritize, then build fast, accessible systems that can iterate. Growth work stays on a metric the business already watches, so design and performance expectations do not outrun the thesis.",
    buyerPromise:
      "Speed should compound a decision, not replace it every release cycle.",
    challenges: [
      "Rapidly evolving positioning and messaging",
      "Multiple audiences and product lines without a shared spine",
      "High expectations for design and performance",
      "Backlogs that grow faster than the growth thesis",
    ],
    tailoredSolutions: [
      {
        pillar: "strategy",
        note: "Positioning and prioritization that keep up with the roadmap without monthly rebrands.",
      },
      {
        pillar: "digital-experiences",
        note: "Fast, accessible, systematized site and UI that can evolve cleanly.",
      },
      {
        pillar: "growth-enablement",
        note: "Continuous iteration against clear pipeline metrics.",
      },
    ],
    icon: "/images/industries/technology.svg",
    relatedProjectSlugs: ["parcel-tech-site", "northpeak-education"],
  },
];

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
  return industries.find((industry) => industry.slug === slug);
}
