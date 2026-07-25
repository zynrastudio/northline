import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Warning } from "@phosphor-icons/react/dist/ssr";
import {
  getCaseStudyBySlug,
  getIndustryBySlug,
  getPillarBySlug,
  industries,
} from "@/content";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.name,
    description: industry.understanding,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relatedProjects = industry.relatedProjectSlugs
    .map((projectSlug) => getCaseStudyBySlug(projectSlug))
    .filter((study) => study != null);

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={industry.name}
        description={industry.understanding}
        showCtas
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading title="Where it gets hard" />
            <ul className="space-y-4">
              {industry.challenges.map((challenge) => (
                <li key={challenge} className="flex gap-3">
                  <Warning
                    weight="regular"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  />
                  <span className="text-base leading-relaxed text-steel">
                    {challenge}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading title="How we tailor the work" />
            <div className="flex flex-col divide-y divide-border rounded-[var(--radius-panel)] border border-border bg-surface-elevated">
              {industry.tailoredSolutions.map((solution) => {
                const pillar = getPillarBySlug(solution.pillar);
                if (!pillar) return null;
                return (
                  <Link
                    key={solution.pillar}
                    href={`/solutions/${pillar.slug}`}
                    className="group flex items-start justify-between gap-6 p-6 transition-colors hover:bg-surface"
                  >
                    <div>
                      <p className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink">
                        {pillar.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-steel">
                        {solution.note}
                      </p>
                    </div>
                    <ArrowRight
                      weight="bold"
                      className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section className="bg-surface-muted">
          <SectionHeading
            title="Relevant work"
            description={`Selected engagements in and around ${industry.name.toLowerCase()}.`}
            action={
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
              >
                All case studies
                <ArrowRight weight="bold" className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Section>
      ) : null}

      <Reveal>
        <CtaBand
          title={`Growth planning for ${industry.name.toLowerCase()}.`}
          description="Book a strategy consultation and we will bring sector-specific patterns to the table."
        />
      </Reveal>
    </>
  );
}
