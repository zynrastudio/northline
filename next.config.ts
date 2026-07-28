import type { NextConfig } from "next";
import { caseStudies } from "./content/case-studies";
import { blogSlugRedirects } from "./content/insights";

/**
 * Phase D–E IA migration redirects (308 permanent).
 */
const serviceToPillar: Record<string, string> = {
  "website-design": "digital-experiences",
  "ui-ux-design": "digital-experiences",
  "graphic-design": "digital-experiences",
  branding: "strategy",
  "content-creation": "growth-enablement",
  "digital-marketing": "growth-enablement",
};

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    const serviceRedirects = Object.entries(serviceToPillar).map(
      ([service, pillar]) => ({
        source: `/services/${service}`,
        destination: `/solutions/${pillar}`,
        permanent: true,
      }),
    );

    const portfolioDetailRedirects = caseStudies.map((study) => ({
      source: `/portfolio/${study.slug}`,
      destination: `/case-studies/${study.slug}`,
      permanent: true,
    }));

    const blogDetailRedirects = Object.entries(blogSlugRedirects).map(
      ([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/insights/${to}`,
        permanent: true,
      }),
    );

    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/portfolio", destination: "/case-studies", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/contact", destination: "/book-consultation", permanent: true },
      ...serviceRedirects,
      ...portfolioDetailRedirects,
      {
        source: "/portfolio/:slug",
        destination: "/case-studies",
        permanent: true,
      },
      ...blogDetailRedirects,
      { source: "/blog/:slug", destination: "/insights", permanent: true },
    ];
  },
};

export default nextConfig;
