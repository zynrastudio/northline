import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import {
  getCaseStudyBySlug,
  getPillarBySlug,
  solutionPillars,
} from "@/content";
import { pillarImage } from "@/lib/pillar-media";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutionPillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};
  return buildMetadata({
    title: pillar.title,
    description: pillar.tagline,
    path: `/solutions/${pillar.slug}`,
  });
}

export default async function SolutionPillarPage({ params }: Props) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const media = pillarImage[pillar.slug];
  const relatedProjects = pillar.relatedProjectSlugs
    .map((projectSlug) => getCaseStudyBySlug(projectSlug))
    .filter((study) => study != null);
  const otherPillars = solutionPillars.filter((p) => p.slug !== pillar.slug);

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={pillar.title}
        description={pillar.tagline}
        showCtas
        imageSrc={media.src}
        imageAlt={media.alt}
        priority
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              The problem
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
              {pillar.problem}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.06}>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Our approach
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
              {pillar.approach}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-surface-muted">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading title="What we deliver" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {pillar.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-[var(--radius-panel)] border border-border bg-surface-elevated p-5 text-base text-ink"
                >
                  <Check
                    weight="bold"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="h-full rounded-[var(--radius-panel)] border border-brand/20 bg-brand-subtle/40 p-8">
              <h3 className="font-[family-name:var(--font-outfit)] text-sm font-medium tracking-[0.14em] text-brand uppercase">
                Business outcome
              </h3>
              <p className="mt-4 font-[family-name:var(--font-outfit)] text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
                {pillar.businessOutcome}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section>
          <SectionHeading
            title="Related work"
            description="Engagements where this pillar moved the numbers that mattered."
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

      <Section className="border-t border-border bg-surface-muted">
        <SectionHeading title="Explore the other pillars" />
        <div className="flex flex-wrap gap-3">
          {otherPillars.map((item) => (
            <Link
              key={item.slug}
              href={`/solutions/${item.slug}`}
              className="rounded-[var(--radius-panel)] border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title={`Ready to put ${pillar.title.toLowerCase()} to work.`}
        description="Book a strategy consultation and we will pressure-test the fit before any commitment."
      />
    </>
  );
}
