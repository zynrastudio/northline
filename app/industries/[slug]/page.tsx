import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import {
  getCaseStudyBySlug,
  getIndustryBySlug,
  getPillarBySlug,
  industries,
} from "@/content";
import { CtaBand } from "@/components/shared/CtaBand";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/SectionHeading";
import { cta } from "@/lib/nav";
import { Button } from "@/components/shared/Button";
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

/**
 * Soft Structuralism industry narrative.
 * Icon-led hero, airy sections, editorial related work — no card soup.
 */
export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relatedProjects = industry.relatedProjectSlugs
    .map((projectSlug) => getCaseStudyBySlug(projectSlug))
    .filter((study) => study != null);

  const otherIndustries = industries.filter((item) => item.slug !== industry.slug);

  return (
    <>
      <section className="border-b border-border bg-surface pt-28 sm:pt-32">
        <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20">
          <Reveal className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-brand uppercase">
              Industries
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {industry.name}
            </h1>
            <p className="mt-3 text-base font-medium text-brand sm:text-lg">
              {industry.tagline}
            </p>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-steel sm:text-lg">
              {industry.understanding}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta.primary.href} withArrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary">
                {cta.secondary.label}
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:justify-self-end" delay={0.08}>
            <div className="rounded-[1.75rem] border border-ink/5 bg-ink/[0.03] p-2 shadow-[0_22px_50px_-28px_rgba(20,22,26,0.35)]">
              <div className="flex aspect-square w-full max-w-sm items-center justify-center rounded-[calc(1.75rem-0.5rem)] bg-surface-elevated shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] sm:max-w-none">
                <Image
                  src={industry.icon}
                  alt=""
                  width={240}
                  height={240}
                  unoptimized
                  priority
                  className="h-[58%] w-[58%]"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Where it gets hard
            </h2>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-steel">
              Patterns we see before the first call, the friction that keeps
              digital from matching how this sector actually buys.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.06}>
            <ul className="border-t border-border">
              {industry.challenges.map((challenge) => (
                <li
                  key={challenge}
                  className="flex gap-4 border-b border-border py-5 text-base leading-relaxed text-ink sm:text-lg"
                >
                  <Check
                    weight="bold"
                    className="mt-1 h-4 w-4 shrink-0 text-brand"
                  />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              How we approach it
            </h2>
            <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-steel sm:text-lg">
              {industry.approach}
            </p>
            <blockquote className="mt-8 border-l-2 border-brand/40 pl-5">
              <p className="font-[family-name:var(--font-outfit)] text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                {industry.buyerPromise}
              </p>
            </blockquote>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.06}>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              How we tailor the work
            </h2>
            <ul className="mt-8 border-t border-border">
              {industry.tailoredSolutions.map((solution) => {
                const pillar = getPillarBySlug(solution.pillar);
                if (!pillar) return null;
                return (
                  <li key={solution.pillar} className="border-b border-border">
                    <Link
                      href={`/solutions/${pillar.slug}`}
                      className="group flex items-start justify-between gap-6 py-6 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink group-hover:text-brand sm:text-xl">
                          {pillar.title}
                        </p>
                        <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-steel sm:text-base">
                          {solution.note}
                        </p>
                      </div>
                      <ArrowRight
                        weight="bold"
                        className="mt-1.5 h-4 w-4 shrink-0 text-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-border bg-surface py-20 sm:py-24">
          <Container>
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  Relevant work
                </h2>
                <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-steel">
                  Selected engagements in and around{" "}
                  {industry.name.toLowerCase()}.
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

      {otherIndustries.length > 0 ? (
        <section className="border-t border-border bg-surface py-20 sm:py-24">
          <Container>
            <Reveal>
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Other sectors
              </h2>
              <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-steel">
                Adjacent industries where the same clarity discipline applies.
              </p>
            </Reveal>
            <Reveal className="mt-10 border-t border-border" delay={0.06}>
              <ul className="grid gap-0 sm:grid-cols-2">
                {otherIndustries.map((item) => (
                  <li key={item.slug} className="border-b border-border sm:odd:border-r">
                    <Link
                      href={`/industries/${item.slug}`}
                      className="group flex items-center gap-4 px-0 py-5 sm:px-4 sm:first:pl-0"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                        className="h-10 w-10 shrink-0"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-[family-name:var(--font-outfit)] text-base font-medium text-ink group-hover:text-brand">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-steel">
                          {item.tagline}
                        </span>
                      </span>
                      <ArrowRight
                        weight="bold"
                        className="h-3.5 w-3.5 shrink-0 text-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={`Growth planning for ${industry.name.toLowerCase()}.`}
        description="Book a strategy consultation and we will bring sector-specific patterns to the table."
      />
    </>
  );
}
