import type { CaseStudy } from "./types";

/**
 * Narrative case studies (Phase E).
 * Slugs match legacy portfolio entries so /portfolio/[slug] can 308 to /case-studies/[slug].
 * Metrics are labeled case metrics - organic figures only, never vanity precision.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "apex-manufacturing",
    title: "Clarity before the quote",
    client: "Apex Manufacturing",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    summary:
      "Apex sold precision and dependability. The site sold a brochure. We rebuilt the digital presence around capability and quote paths so technical buyers could move without sales hand-holding every step.",
    challenge:
      "Apex's web presence lagged the quality of the plant floor. Product lines were dense, specifications lived in PDFs, and quote requests arrived as free-form emails that sales had to unpack by hand. Enterprise buyers left unsure whether Apex could handle their volume, and the sales team spent cycles qualifying traffic that was never going to buy.",
    strategy:
      "We treated the site as a capability instrument, not a brochure. Strategy work narrowed the customers worth pursuing, mapped the multi-stakeholder consideration cycle, and defined a single primary action: request a quote with enough structure to score and route. Positioning led with precision and dependability, not generic industrial language.",
    execution:
      "We designed a structured product and capability presentation, rebuilt the marketing site for speed and accessibility, and wired quote intake into scoring and CRM routing under the Business Automation pillar. Sales collateral was aligned to the same messaging so trade shows and the site told one story. Growth Enablement covered an initial content cadence for trade and channel audiences.",
    businessOutcome:
      "Inbound quote requests arrived with clearer context. Sales spent less time decoding intent and more time on opportunities that matched Apex's sweet spot. The digital presence finally reinforced the reputation the operation already earned on the floor.",
    lessonsLearned: [
      "Capability without a clear next step is still friction for industrial buyers.",
      "Quote forms that ask for the right fields outperform open email inboxes for both sides.",
      "Sales collateral and the website must share one argument, or trust leaks at the handoff.",
    ],
    pillars: ["strategy", "digital-experiences", "business-automation"],
    hero: "/images/case-studies/apex-manufacturing-hero.jpg",
    heroAlt:
      "Precise industrial workspace with specification binders and a structured quote-request path",
    gallery: [
      "/images/case-studies/apex-manufacturing-gallery-1.jpg",
      "/images/case-studies/apex-manufacturing-gallery-2.jpg",
    ],
    metrics: [
      {
        label: "Quote request completeness",
        value: "Up ~2x",
        note: "Case metric: fields required vs prior free-form email",
      },
      {
        label: "Sales time on unqualified inbound",
        value: "Down",
        note: "Case metric: qualitative report from sales leadership",
      },
    ],
    featured: true,
  },
  {
    slug: "parcel-tech-site",
    title: "One story from site to demo",
    client: "Parcel Tech",
    industry: "Technology",
    industrySlug: "technology",
    summary:
      "Parcel Tech's corporate site explained the product in fragments. We rebuilt the buyer journey so enterprise prospects arrived at demos with a coherent story, and demos started from clarity instead of catch-up.",
    challenge:
      "The marketing site and product narrative drifted apart. Technical buyers got dense feature lists. Non-technical stakeholders got slogans. Demo requests arrived without context, so sales spent the first half of every call re-explaining what Parcel Tech actually does. Conversion looked fine on paper until leadership asked which demos turned into pipeline.",
    strategy:
      "We wrote a single growth thesis: the site exists to produce qualified demo conversations, not brand impressions. Buyer research separated enterprise logistics operators from tire-kickers. Messaging hierarchy put the problem and proof before the feature matrix. The demo path became the spine of the information architecture.",
    execution:
      "Digital Experiences rebuilt the marketing site around the journey: problem, proof, product, path to demo. Strategy locked positioning. Business Automation scored and routed demo requests into the CRM with opportunity creation. Growth Enablement set experiment and reporting cadence against demo-to-opportunity conversion, not vanity traffic.",
    businessOutcome:
      "Demos started from a shared story. Sales reported fewer early-call resets. Leadership could see which site paths produced conversations worth pursuing, which made prioritization for the next quarter obvious.",
    lessonsLearned: [
      "If marketing and product tell different stories, sales pays the tax on every call.",
      "Demo volume without qualification criteria is a vanity metric.",
      "Wire scoring before you celebrate traffic growth.",
    ],
    pillars: ["strategy", "digital-experiences", "business-automation", "growth-enablement"],
    hero: "/images/case-studies/parcel-tech-site-hero.jpg",
    heroAlt:
      "Buyer journey map and demo qualification materials on an editorial strategy desk",
    gallery: [
      "/images/case-studies/parcel-tech-site-gallery-1.jpg",
      "/images/case-studies/parcel-tech-site-gallery-2.jpg",
    ],
    metrics: [
      {
        label: "Demo requests with role + use case",
        value: "Majority of inbound",
        note: "Case metric: post-launch form fields vs prior name-and-email",
      },
    ],
    featured: true,
  },
  {
    slug: "ledgerly-rebrand",
    title: "Positioning that separates the firm",
    client: "Ledgerly",
    industry: "Professional Services",
    industrySlug: "professional-services",
    summary:
      "Ledgerly looked like every other fintech advisor on the page. We rebuilt positioning and identity so serious prospects could tell the difference in seconds, then carried that clarity into the site.",
    challenge:
      "As Ledgerly expanded into new markets, the brand still spoke like an early-stage product. Partners were protective of tone. Prospects could not articulate why Ledgerly over a lookalike competitor. The website reflected internal org charts more than how buyers decided.",
    strategy:
      "We ran positioning against real buyer interviews, not internal preference. The growth thesis: win on trust and clarity of advice, not feature parity. Identity work followed the thesis. Visual system and guidelines existed to protect that difference, not to decorate pitch decks.",
    execution:
      "Strategy delivered the messaging framework and buyer journey map. Digital Experiences carried the new system onto a credibility-first marketing site with clear paths to consultation. Growth Enablement started a thought-leadership cadence that compounded authority instead of shipping tip posts.",
    businessOutcome:
      "Partners had a shared language for how Ledgerly shows up. The site stopped forcing prospects to reverse-engineer differentiation. Consultation requests arrived with more informed context about what Ledgerly actually does.",
    lessonsLearned: [
      "Brand refresh without a positioning decision is costume change.",
      "Professional services buyers decide on trust faster than on aesthetics.",
      "Guidelines only work when the team can apply them in under a minute.",
    ],
    pillars: ["strategy", "digital-experiences", "growth-enablement"],
    hero: "/images/case-studies/ledgerly-rebrand-hero.jpg",
    heroAlt:
      "Positioning framework and restrained brand materials on a soft silver desk",
    gallery: [
      "/images/case-studies/ledgerly-rebrand-gallery-1.jpg",
      "/images/case-studies/ledgerly-rebrand-gallery-2.jpg",
    ],
    featured: true,
  },
  {
    slug: "northpeak-education",
    title: "Product UX that matches the pitch",
    client: "Northpeak Education",
    industry: "SaaS",
    industrySlug: "saas",
    summary:
      "Northpeak's marketing site promised a clearer learning experience than the product delivered. We aligned interface, messaging, and trial routing so the product and the pitch stopped contradicting each other.",
    challenge:
      "Stakeholders disagreed on what the next product surface should prioritize. The marketing site oversold simplicity. Trial users bounced when the interface felt denser than the homepage. Product and marketing debated in silos, and neither owned the conversion metric that mattered: activated trials.",
    strategy:
      "We forced a shared definition of success: activated trials from the right institutions, not homepage bounce rate. Strategy work mapped the institutional buyer and the end-user learner as two audiences with one coherent story. UX decisions followed that story, not feature popularity contests.",
    execution:
      "Digital Experiences delivered wireframes, UI, and a clickable prototype that aligned stakeholders before build. The marketing site was tightened to match what the product could honestly claim. Business Automation routed trial and demo requests with scoring. Growth Enablement set experiment backlog against activation, not clicks.",
    businessOutcome:
      "Stakeholders stopped arguing from preference and started arguing from the same prototype. The pitch and the product moved closer together. Trial conversations started with fewer 'this looks different from the site' objections.",
    lessonsLearned: [
      "A marketing site that outruns the product trains buyers to distrust you.",
      "Prototypes settle debates faster than decks.",
      "Activation is a better north star than trial signups alone.",
    ],
    pillars: ["strategy", "digital-experiences", "business-automation"],
    hero: "/images/case-studies/northpeak-education-hero.jpg",
    heroAlt:
      "Wireframes and a product prototype arranged for pitch-to-product alignment",
    gallery: [
      "/images/case-studies/northpeak-education-gallery-1.jpg",
      "/images/case-studies/northpeak-education-gallery-2.jpg",
    ],
    featured: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(limit = 4): CaseStudy[] {
  const featured = caseStudies.filter((study) => study.featured);
  const source = featured.length > 0 ? featured : caseStudies;
  return source.slice(0, limit);
}

export function getCaseStudiesByPillar(pillar: string): CaseStudy[] {
  return caseStudies.filter((study) =>
    study.pillars.includes(pillar as CaseStudy["pillars"][number]),
  );
}

export function getCaseStudiesByIndustry(industrySlug: string): CaseStudy[] {
  return caseStudies.filter((study) => study.industrySlug === industrySlug);
}
