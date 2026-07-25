import { insights } from "@/content/insights";
import { InsightCard } from "@/components/insights/InsightCard";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Frameworks, guides, and industry resources that demonstrate how Northline thinks before the first call.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = [...insights].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        title="Frameworks before contact."
        description="Strategic depth over tip posts. Read how we diagnose, position, and prioritize before you book a call."
        showCtas
      />

      <Section>
        <SectionHeading
          title="Latest"
          description="Guides, frameworks, and industry notes for B2B operators."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Prefer a conversation to a PDF."
        description="Book a strategy consultation when you are ready to apply this to your own pipeline."
      />
    </>
  );
}
