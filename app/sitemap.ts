import type { MetadataRoute } from "next";
import { caseStudies, industries, insights, solutionPillars } from "@/content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://northlinecreative.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const afterStatic = [
    "",
    "/solutions",
    "/industries",
    "/case-studies",
    "/process",
    "/insights",
    "/about",
    "/book-consultation",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const pillarRoutes = solutionPillars.map((pillar) => ({
    url: `${siteUrl}/solutions/${pillar.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightRoutes = insights.map((post) => ({
    url: `${siteUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...afterStatic,
    ...pillarRoutes,
    ...industryRoutes,
    ...caseStudyRoutes,
    ...insightRoutes,
  ];
}
