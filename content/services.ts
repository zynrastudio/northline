import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Design",
    shortDescription:
      "Business websites, landing pages, and corporate sites built to look professional and perform reliably.",
    overview:
      "We design and develop websites that help businesses present themselves online with clarity and polish. From marketing sites to landing pages, our team focuses on clean layouts, clear messaging, and a smooth experience across devices.",
    benefits: [
      "Custom designs tailored to your brand",
      "Responsive layouts for desktop and mobile",
      "Clear page structure for key business pages",
      "Support for ongoing updates and improvements",
    ],
    image: "/images/services/website-design.png",
    relatedProjectSlugs: ["summit-health-website", "brightpath-retail", "ledgerly-rebrand"],
  },
  {
    slug: "branding",
    title: "Branding",
    shortDescription:
      "Logo design, visual identity systems, and brand guidelines that keep your look consistent.",
    overview:
      "Our branding work helps businesses establish a recognizable visual presence. We create logos, identity systems, and guidelines so your brand looks cohesive across digital and print touchpoints.",
    benefits: [
      "Distinctive logo and mark exploration",
      "Color, typography, and visual identity systems",
      "Practical brand guidelines for your team",
      "Assets ready for web, social, and print",
    ],
    image: "/images/services/branding.png",
    relatedProjectSlugs: ["ledgerly-rebrand", "harborview-hospitality", "northpeak-education"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "SEO, social media, email marketing, and paid advertising to help you reach more customers.",
    overview:
      "We support businesses with practical digital marketing programs across search, social, email, and paid channels. Our approach emphasizes clear campaigns, consistent messaging, and steady visibility online.",
    benefits: [
      "Search-friendly content and SEO foundations",
      "Social content planning and publishing support",
      "Email campaigns that stay on brand",
      "Paid advertising setup and creative support",
    ],
    image: "/images/services/digital-marketing.png",
    relatedProjectSlugs: ["brightpath-retail", "apex-manufacturing", "carefirst-clinic"],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    shortDescription:
      "Copywriting, photography, and video production that bring your brand story to life.",
    overview:
      "Strong content helps businesses communicate clearly. We provide copywriting, photography, and video support so your website, campaigns, and social channels feel polished and on-message.",
    benefits: [
      "Website and marketing copywriting",
      "Professional photography for brand and product",
      "Short-form video for web and social",
      "Content that aligns with your visual identity",
    ],
    image: "/images/services/content-creation.png",
    relatedProjectSlugs: ["harborview-hospitality", "northpeak-education", "summit-health-website"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    shortDescription:
      "Marketing materials, presentations, and print assets that keep your communications sharp.",
    overview:
      "From pitch decks to print collateral, our graphic design team creates polished materials that support sales, marketing, and internal communications with a consistent professional look.",
    benefits: [
      "Marketing collateral and one-pagers",
      "Presentation and pitch deck design",
      "Print-ready assets and templates",
      "Visual consistency across campaigns",
    ],
    image: "/images/services/graphic-design.png",
    relatedProjectSlugs: ["apex-manufacturing", "ledgerly-rebrand", "carefirst-clinic"],
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    shortDescription:
      "Wireframes, interface design, and prototypes that make digital products easier to use.",
    overview:
      "We help teams shape digital product experiences through research-informed wireframes, interface design, and interactive prototypes—so stakeholders can align before development begins.",
    benefits: [
      "User flows and wireframes",
      "High-fidelity interface design",
      "Clickable prototypes for review",
      "Design handoff support for developers",
    ],
    image: "/images/services/ui-ux-design.png",
    relatedProjectSlugs: ["brightpath-retail", "summit-health-website", "northpeak-education"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
