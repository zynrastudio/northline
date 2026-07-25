import { caseStudies, getFeaturedCaseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Challenge, strategy, execution, and business outcomes from Northline engagements.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const featured = getFeaturedCaseStudies(4);
  const rest = caseStudies.filter(
    (study) => !featured.some((f) => f.slug === study.slug),
  );

  return (
    <>
      <PageHero
        title="Proof in the work."
        description="Outcome-led narratives. Challenge through lessons learned, not a visual gallery."
        showCtas
      />

      <Section>
        <SectionHeading
          title="Featured engagements"
          description="Four stories that show how clarity turns into pipeline."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      {rest.length > 0 ? (
        <Section className="bg-surface-muted">
          <SectionHeading title="More work" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Want this level of clarity on your next engagement."
        description="Book a strategy consultation and we will pressure-test the fit."
      />
    </>
  );
}
