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

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  cover: string;
  tags?: string[];
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
