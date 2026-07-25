import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getPillarBySlug } from "@/content/solutions";
import type { CaseStudy } from "@/content/types";
import { CaseStudyEngagement } from "@/components/analytics/EngagementEvents";
import { Container } from "@/components/shared/Container";
import { ContentImage } from "@/components/shared/ContentImage";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

type CaseStudyDetailProps = {
  study: CaseStudy;
};

const narrative = [
  { key: "challenge", title: "Challenge" },
  { key: "strategy", title: "Strategy" },
  { key: "execution", title: "Execution" },
  { key: "businessOutcome", title: "Business outcome" },
] as const;

export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  return (
    <>
      <CaseStudyEngagement
        slug={study.slug}
        title={study.title}
        industry={study.industry}
      />

      <section className="relative isolate min-h-[70dvh] overflow-hidden bg-ink">
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
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/30"
        />
        <Container className="relative flex min-h-[70dvh] flex-col justify-end pb-14 pt-32 sm:pb-16">
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
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-12 lg:col-span-8">
            {narrative.map((section) => (
              <Reveal key={section.key}>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
                  {study[section.key]}
                </p>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[var(--radius-panel)] border border-border bg-surface-muted p-6">
                <h2 className="text-sm font-medium tracking-wide text-steel uppercase">
                  Pillars involved
                </h2>
                <ul className="mt-4 space-y-2">
                  {study.pillars.map((slug) => {
                    const pillar = getPillarBySlug(slug);
                    if (!pillar) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/solutions/${slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
                        >
                          {pillar.title}
                          <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {study.industrySlug ? (
                  <>
                    <p className="mt-6 text-sm font-medium tracking-wide text-steel uppercase">
                      Industry
                    </p>
                    <Link
                      href={`/industries/${study.industrySlug}`}
                      className="mt-2 inline-block text-sm font-medium text-ink hover:text-brand"
                    >
                      {study.industry}
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="mt-6 text-sm font-medium tracking-wide text-steel uppercase">
                      Industry
                    </p>
                    <p className="mt-2 text-sm font-medium text-ink">
                      {study.industry}
                    </p>
                  </>
                )}
              </div>

              {study.metrics && study.metrics.length > 0 ? (
                <div className="rounded-[var(--radius-panel)] border border-brand/20 bg-brand-subtle/40 p-6">
                  <h2 className="text-sm font-medium tracking-wide text-brand uppercase">
                    Case metrics
                  </h2>
                  <ul className="mt-4 space-y-4">
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
              ) : null}
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-surface-muted">
        <SectionHeading title="Lessons learned" />
        <ul className="grid gap-4 md:grid-cols-3">
          {study.lessonsLearned.map((lesson) => (
            <li
              key={lesson}
              className="rounded-[var(--radius-panel)] border border-border bg-surface-elevated p-6 text-base leading-relaxed text-ink"
            >
              {lesson}
            </li>
          ))}
        </ul>
      </Section>

      {study.gallery && study.gallery.length > 0 ? (
        <Section>
          <SectionHeading
            title="From the engagement"
            description="Supporting visuals from the work. No product UI theater."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {study.gallery.map((image, index) => (
              <DoubleBezel key={image}>
                <ContentImage
                  src={image}
                  alt={`${study.client} gallery image ${index + 1}`}
                  aspect="photo"
                  className="rounded-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </DoubleBezel>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
