import { homeContent } from "@/content/home";
import { siteSettings } from "@/content";
import { HomeHero } from "@/components/home/HomeHero";
import { HomePositioning } from "@/components/home/HomePositioning";
import { HomePillars } from "@/components/home/HomePillars";
import { HomeProof } from "@/components/home/HomeProof";
import { HomeIndustries } from "@/components/home/HomeIndustries";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeInsights } from "@/components/home/HomeInsights";
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
      <HomePositioning />
      <HomePillars />
      <HomeProof />
      <HomeIndustries />
      <HomeProcess />
      <HomeInsights />
      <CtaBand
        title={homeContent.cta.title}
        description={homeContent.cta.description}
      />
    </>
  );
}
