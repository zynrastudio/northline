import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { getPillarBySlug } from "@/content/solutions";
import type { CaseStudy } from "@/content/types";
import { CaseStudyEngagement } from "@/components/analytics/EngagementEvents";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/SectionHeading";

type CaseStudyDetailProps = {
  study: CaseStudy;
};

const narrative = [
  { key: "challenge", title: "Challenge" },
  { key: "strategy", title: "Strategy" },
  { key: "execution", title: "Execution" },
  { key: "businessOutcome", title: "Business outcome" },
] as const;

/**
 * Soft Structuralism case narrative.
 * Full-bleed hero, airy measure, quiet meta aside, lessons as list — no card soup.
 */
export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  return (
    <>
      <CaseStudyEngagement
        slug={study.slug}
        title={study.title}
        industry={study.industry}
      />

      <section className="relative isolate min-h-[62dvh] overflow-hidden bg-ink sm:min-h-[70dvh]">
        <Image
          src={study.hero}
          alt={study.heroAlt}
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
            <p className="text-sm font-medium tracking-wide text-white/70 uppercase">
              {study.industry}
            </p>
            <p className="mt-3 font-[family-name:var(--font-outfit)] text-lg font-medium text-brand-subtle">
              {study.client}
            </p>
            <h1 className="mt-2 max-w-[18ch] font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-white/80 sm:text-lg">
              {study.summary}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-14 lg:col-span-8">
            {narrative.map((section, index) => (
              <Reveal key={section.key} delay={index * 0.04}>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-steel sm:text-lg">
                  {study[section.key]}
                </p>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <Reveal delay={0.08}>
              <div className="sticky top-28 space-y-8">
                <div className="border-t border-border pt-6">
                  <h2 className="text-xs font-medium tracking-[0.16em] text-steel uppercase">
                    Pillars involved
                  </h2>
                  <ul className="mt-4 space-y-0">
                    {study.pillars.map((slug) => {
                      const pillar = getPillarBySlug(slug);
                      if (!pillar) return null;
                      return (
                        <li key={slug} className="border-b border-border">
                          <Link
                            href={`/solutions/${slug}`}
                            className="group flex items-center justify-between gap-3 py-3 text-sm font-medium text-ink transition-colors hover:text-brand"
                          >
                            {pillar.title}
                            <ArrowRight
                              weight="bold"
                              className="h-3.5 w-3.5 shrink-0 text-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-8 text-xs font-medium tracking-[0.16em] text-steel uppercase">
                    Industry
                  </p>
                  {study.industrySlug ? (
                    <Link
                      href={`/industries/${study.industrySlug}`}
                      className="mt-2 inline-block text-sm font-medium text-ink hover:text-brand"
                    >
                      {study.industry}
                    </Link>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-ink">
                      {study.industry}
                    </p>
                  )}
                </div>

                {study.metrics && study.metrics.length > 0 ? (
                  <div className="rounded-[1.25rem] border border-ink/5 bg-ink/[0.03] p-1.5">
                    <div className="rounded-[calc(1.25rem-0.375rem)] bg-brand-subtle/50 px-5 py-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]">
                      <h2 className="text-xs font-medium tracking-[0.16em] text-brand uppercase">
                        Case metrics
                      </h2>
                      <ul className="mt-5 space-y-5">
                        {study.metrics.map((metric) => (
                          <li key={metric.label}>
                            <p className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink">
                              {metric.value}
                            </p>
                            <p className="mt-1 text-sm font-medium text-ink">
                              {metric.label}
                            </p>
                            {metric.note ? (
                              <p className="mt-1 text-xs leading-relaxed text-steel">
                                {metric.note}
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <Container>
          <Reveal>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Lessons learned
            </h2>
            <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-steel">
              What we would carry into the next engagement.
            </p>
          </Reveal>
          <Reveal className="mt-10 border-t border-border" delay={0.06}>
            <ul>
              {study.lessonsLearned.map((lesson) => (
                <li
                  key={lesson}
                  className="flex gap-4 border-b border-border py-5 text-base leading-relaxed text-ink sm:text-lg"
                >
                  <Check
                    weight="bold"
                    className="mt-1 h-4 w-4 shrink-0 text-brand"
                  />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {study.gallery && study.gallery.length > 0 ? (
        <Section className="bg-surface">
          <Reveal>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              From the engagement
            </h2>
            <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-steel">
              Supporting visuals from the work. No product UI theater.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {study.gallery.map((image, index) => (
              <Reveal key={image} delay={index * 0.06}>
                <DoubleBezel>
                  <div className="relative aspect-[4/3] bg-surface-muted">
                    <Image
                      src={image}
                      alt={`${study.client} engagement visual ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </DoubleBezel>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
