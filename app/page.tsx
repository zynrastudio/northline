import { siteSettings } from "@/content";
import { HomeAboutPreview } from "@/components/home/HomeAboutPreview";
import { HomeBlogPreview } from "@/components/home/HomeBlogPreview";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { CtaBand } from "@/components/shared/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  description: siteSettings.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeProjects />
      <HomeAboutPreview />
      <HomeTestimonials />
      <HomeBlogPreview />
      <CtaBand />
    </>
  );
}
