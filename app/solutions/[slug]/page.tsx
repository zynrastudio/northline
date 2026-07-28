import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import {
  getCaseStudyBySlug,
  getPillarBySlug,
  solutionPillars,
} from "@/content";
import { pillarImage } from "@/lib/pillar-media";
import { Button } from "@/components/shared/Button";
import { CtaBand } from "@/components/shared/CtaBand";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/SectionHeading";
import { cta } from "@/lib/nav";
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
    image: pillarImage[pillar.slug].src,
  });
}

/**
 * Soft Structuralism pillar narrative.
 * Full-bleed dedicated hero, airy sections, editorial related work.
 */
export default async function SolutionPillarPage({ params }: Props) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const media = pillarImage[pillar.slug];
  const relatedProjects = pillar.relatedProjectSlugs
    .map((projectSlug) => getCaseStudyBySlug(projectSlug))
    .filter((study) => study != null);
  const otherPillars = solutionPillars.filter((p) => p.slug !== pillar.slug);
  const pillarIndex = solutionPillars.findIndex((p) => p.slug === pillar.slug);
  const pillarNumber = String(pillarIndex + 1).padStart(2, "0");

  return (
    <>
      <section className="relative isolate min-h-[62dvh] overflow-hidden bg-ink sm:min-h-[70dvh]">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/55 to-ink/25"
        />
        <Container className="relative flex min-h-[62dvh] flex-col justify-end pb-14 pt-32 sm:min-h-[70dvh] sm:pb-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium tracking-wide text-white/70 uppercase">
              <span>Solutions</span>
              <span aria-hidden className="text-white/35">
                ·
              </span>
              <span className="tabular-nums text-brand-subtle">{pillarNumber}</span>
            </div>
            <h1 className="mt-3 max-w-[16ch] font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pillar.title}
            </h1>
            <p className="mt-3 text-base font-medium text-brand-subtle sm:text-lg">
              {pillar.tagline}
            </p>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/80 sm:text-lg">
              {pillar.businessOutcome}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta.primary.href} withArrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="ghost">
                {cta.secondary.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              The problem
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-steel sm:text-lg">
              {pillar.problem}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.06}>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Our approach
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-steel sm:text-lg">
              {pillar.approach}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              What we deliver
            </h2>
            <ul className="mt-8 border-t border-border">
              {pillar.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-border py-5 text-base leading-relaxed text-ink sm:text-lg"
                >
                  <Check
                    weight="bold"
                    className="mt-1 h-4 w-4 shrink-0 text-brand"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.06}>
            <div className="rounded-[1.25rem] border border-ink/5 bg-ink/[0.03] p-1.5 lg:sticky lg:top-28">
              <div className="rounded-[calc(1.25rem-0.375rem)] bg-brand-subtle/50 px-6 py-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] sm:px-8">
                <h3 className="text-xs font-medium tracking-[0.16em] text-brand uppercase">
                  Business outcome
                </h3>
                <p className="mt-4 font-[family-name:var(--font-outfit)] text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
                  {pillar.businessOutcome}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-border bg-surface py-20 sm:py-24">
          <Container>
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  Related work
                </h2>
                <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-steel">
                  Engagements where this pillar moved the numbers that mattered.
                </p>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
              >
                All case studies
                <ArrowRight weight="bold" className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
            <Reveal className="mt-10 border-t border-border" delay={0.06}>
              <ul>
                {relatedProjects.map((study) => (
                  <li key={study.slug} className="border-b border-border">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group grid gap-3 py-6 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6"
                    >
                      <span className="text-xs font-medium tracking-[0.14em] text-steel uppercase sm:col-span-3">
                        {study.industry}
                      </span>
                      <span className="min-w-0 sm:col-span-4">
                        <span className="block text-sm font-medium text-brand">
                          {study.client}
                        </span>
                        <span className="mt-1 block font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink group-hover:text-brand sm:text-xl">
                          {study.title}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed text-steel sm:col-span-4">
                        {study.summary}
                      </span>
                      <span className="sm:col-span-1 sm:justify-self-end">
                        <ArrowRight
                          weight="bold"
                          className="h-4 w-4 text-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {otherPillars.length > 0 ? (
        <section className="border-t border-border bg-surface py-20 sm:py-24">
          <Container>
            <Reveal>
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                The rest of the system
              </h2>
              <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-steel">
                Pillars are numbered for sequence, not silos. Each one
                strengthens the others.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {otherPillars.map((item) => {
                const itemMedia = pillarImage[item.slug];
                const itemIndex = solutionPillars.findIndex(
                  (p) => p.slug === item.slug,
                );
                return (
                  <Reveal key={item.slug} delay={itemIndex * 0.04}>
                    <Link
                      href={`/solutions/${item.slug}`}
                      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      <DoubleBezel>
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={itemMedia.src}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                          />
                        </div>
                      </DoubleBezel>
                      <p className="mt-5 font-[family-name:var(--font-outfit)] text-xs font-medium tabular-nums tracking-[0.14em] text-brand">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink group-hover:text-brand">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-steel">
                        {item.tagline}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={`Ready to put ${pillar.title.toLowerCase()} to work.`}
        description="Book a strategy consultation and we will pressure-test the fit before any commitment."
      />
    </>
  );
}
