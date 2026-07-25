import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "summit-health-website",
    title: "Summit Health Website",
    industry: "Healthcare",
    summary: "A clean corporate website for a regional healthcare group.",
    overview:
      "Summit Health needed a refreshed online presence to present their clinics, services, and care philosophy. We delivered a professional marketing website with clear navigation and approachable imagery.",
    hero: "/images/projects/summit-health/hero.png",
    services: ["website-design", "content-creation", "ui-ux-design"],
    gallery: [
      "/images/projects/summit-health/gallery-1.png",
      "/images/projects/summit-health/gallery-2.png",
      "/images/projects/summit-health/gallery-3.png",
    ],
  },
  {
    slug: "ledgerly-rebrand",
    title: "Ledgerly Rebrand",
    industry: "Finance",
    summary: "Visual identity and brand guidelines for a growing fintech startup.",
    overview:
      "Ledgerly asked us to modernize their brand as they expanded into new markets. The engagement covered logo refinement, a flexible visual system, and guidelines for internal and external teams.",
    hero: "/images/projects/ledgerly/hero.png",
    services: ["branding", "graphic-design", "website-design"],
    gallery: [
      "/images/projects/ledgerly/gallery-1.png",
      "/images/projects/ledgerly/gallery-2.png",
      "/images/projects/ledgerly/gallery-3.png",
    ],
  },
  {
    slug: "brightpath-retail",
    title: "BrightPath Retail Experience",
    industry: "Retail",
    summary: "Ecommerce-focused site design and campaign creative for a lifestyle brand.",
    overview:
      "BrightPath wanted a brighter digital storefront and supporting campaign assets. We designed key site templates and marketing creative to help the brand feel cohesive across web and social.",
    hero: "/images/projects/brightpath/hero.png",
    services: ["website-design", "digital-marketing", "ui-ux-design"],
    gallery: [
      "/images/projects/brightpath/gallery-1.png",
      "/images/projects/brightpath/gallery-2.png",
      "/images/projects/brightpath/gallery-3.png",
    ],
  },
  {
    slug: "harborview-hospitality",
    title: "Harborview Hospitality",
    industry: "Hospitality",
    summary: "Brand storytelling and content for a boutique hotel collection.",
    overview:
      "Harborview needed content and visual direction that captured the feel of their properties. We produced photography direction, web copy, and supporting brand materials for guest-facing channels.",
    hero: "/images/projects/harborview/hero.png",
    services: ["branding", "content-creation"],
    gallery: [
      "/images/projects/harborview/gallery-1.png",
      "/images/projects/harborview/gallery-2.png",
      "/images/projects/harborview/gallery-3.png",
    ],
  },
  {
    slug: "apex-manufacturing",
    title: "Apex Manufacturing Brochure Site",
    industry: "Manufacturing",
    summary: "A straightforward company site and sales collateral for an industrial brand.",
    overview:
      "Apex needed a dependable web presence and print-ready materials for trade shows. We built a clear brochure site and complementary graphic design assets for their sales team.",
    hero: "/images/projects/apex/hero.png",
    services: ["website-design", "graphic-design", "digital-marketing"],
    gallery: [
      "/images/projects/apex/gallery-1.png",
      "/images/projects/apex/gallery-2.png",
      "/images/projects/apex/gallery-3.png",
    ],
  },
  {
    slug: "northpeak-education",
    title: "Northpeak Education Platform UI",
    industry: "Education",
    summary: "Interface design and prototype for a learning platform redesign.",
    overview:
      "Northpeak engaged us to explore a clearer learning experience. We delivered wireframes, UI designs, and a clickable prototype to align stakeholders around the new product direction.",
    hero: "/images/projects/northpeak/hero.png",
    services: ["ui-ux-design", "branding", "content-creation"],
    gallery: [
      "/images/projects/northpeak/gallery-1.png",
      "/images/projects/northpeak/gallery-2.png",
      "/images/projects/northpeak/gallery-3.png",
    ],
  },
  {
    slug: "carefirst-clinic",
    title: "CareFirst Clinic Campaign",
    industry: "Healthcare",
    summary: "Local awareness campaign creative and landing page support.",
    overview:
      "CareFirst needed campaign materials to promote new clinic services. We designed landing page layouts, digital ads, and supporting graphics for a multi-channel launch.",
    hero: "/images/projects/carefirst/hero.png",
    services: ["digital-marketing", "graphic-design", "content-creation"],
    gallery: [
      "/images/projects/carefirst/gallery-1.png",
      "/images/projects/carefirst/gallery-2.png",
      "/images/projects/carefirst/gallery-3.png",
    ],
  },
  {
    slug: "parcel-tech-site",
    title: "Parcel Tech Corporate Site",
    industry: "Technology",
    summary: "A modern company website for a logistics software provider.",
    overview:
      "Parcel Tech wanted a professional site to explain their platform and build trust with enterprise prospects. We delivered a structured marketing site with product-focused pages and clean visuals.",
    hero: "/images/projects/parcel-tech/hero.png",
    services: ["website-design", "ui-ux-design", "branding"],
    gallery: [
      "/images/projects/parcel-tech/gallery-1.png",
      "/images/projects/parcel-tech/gallery-2.png",
      "/images/projects/parcel-tech/gallery-3.png",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByService(serviceSlug: string): Project[] {
  return projects.filter((project) =>
    project.services.includes(serviceSlug as Project["services"][number]),
  );
}

export function getFeaturedProjects(limit = 4): Project[] {
  return projects.slice(0, limit);
}
