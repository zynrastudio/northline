export type ServiceSlug =
  | "website-design"
  | "branding"
  | "digital-marketing"
  | "content-creation"
  | "graphic-design"
  | "ui-ux-design";

export type Industry =
  | "Healthcare"
  | "Finance"
  | "Real Estate"
  | "Retail"
  | "Technology"
  | "Manufacturing"
  | "Education"
  | "Hospitality";

export type PillarSlug =
  | "strategy"
  | "digital-experiences"
  | "business-automation"
  | "growth-enablement";

export type IndustrySlug =
  | "professional-services"
  | "saas"
  | "industrial"
  | "manufacturing"
  | "technology";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  overview: string;
  benefits: string[];
  image: string;
  relatedProjectSlugs: string[];
};

export type Project = {
  slug: string;
  title: string;
  industry: Industry;
  summary: string;
  overview: string;
  hero: string;
  services: ServiceSlug[];
  gallery: string[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  avatar?: string;
};

/** @deprecated Prefer Insight for after-IA content. Kept for legacy blog adapters. */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  cover: string;
  tags?: string[];
};

export type CaseStudyMetric = {
  label: string;
  value: string;
  note?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  industrySlug?: IndustrySlug;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  businessOutcome: string;
  lessonsLearned: string[];
  pillars: PillarSlug[];
  hero: string;
  heroAlt: string;
  gallery?: string[];
  metrics?: CaseStudyMetric[];
  featured?: boolean;
};

export type InsightCategory =
  | "Insights"
  | "Frameworks"
  | "Guides"
  | "Industry Resources"
  | "Thought Leadership";

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  cover: string;
  coverAlt: string;
  category: InsightCategory;
  relatedPillars?: PillarSlug[];
  relatedCaseStudySlugs?: string[];
};

export type SolutionPillar = {
  slug: PillarSlug;
  title: string;
  tagline: string;
  problem: string;
  approach: string;
  deliverables: string[];
  businessOutcome: string;
  legacyServices: ServiceSlug[];
  relatedProjectSlugs: string[];
  image: string;
};

export type IndustryPage = {
  slug: IndustrySlug;
  name: string;
  understanding: string;
  challenges: string[];
  tailoredSolutions: { pillar: PillarSlug; note: string }[];
  relatedProjectSlugs: string[];
};

export type ProcessStep = {
  action: string;
  summary: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteSettings = {
  companyName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  };
  social: SocialLink[];
};
