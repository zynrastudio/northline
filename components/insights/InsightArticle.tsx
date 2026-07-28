import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/format";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { getInsightReadingMinutes } from "@/content/insights";
import type { Insight } from "@/content/types";
import { InsightEngagement } from "@/components/analytics/EngagementEvents";
import { InsightBody } from "@/components/insights/InsightBody";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/SectionHeading";

type InsightArticleProps = {
  insight: Insight;
  related: Insight[];
};

/**
 * Soft Structuralism + Editorial Split for longform.
 * Full-bleed hero plane, bezeled cover, airy measure, related as list.
 */
export function InsightArticle({ insight, related }: InsightArticleProps) {
  const relatedCases = (insight.relatedCaseStudySlugs ?? [])
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((study) => study != null);
  const minutes = getInsightReadingMinutes(insight.body);

  return (
    <>
      <InsightEngagement slug={insight.slug} category={insight.category} />

      <article>
        <header className="relative isolate min-h-[62dvh] overflow-hidden bg-ink sm:min-h-[70dvh]">
          <Image
            src={insight.cover}
            alt={insight.coverAlt}
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
                {insight.category}
              </p>
              <h1 className="mt-3 max-w-[18ch] font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                {insight.title}
              </h1>
              <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/80 sm:text-lg">
                {insight.excerpt}
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/55">
                <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                <span aria-hidden>·</span>
                <span>{minutes} min read</span>
              </p>
            </Reveal>
          </Container>
        </header>

        <Section className="bg-surface">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <InsightBody body={insight.body} />
            </Reveal>

            {relatedCases.length > 0 ? (
              <Reveal className="mt-14 border-t border-border pt-10 sm:mt-16" delay={0.06}>
                <h2 className="font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  Related case studies
                </h2>
                <ul className="mt-5 space-y-0">
                  {relatedCases.map((study) => (
                    <li key={study.slug} className="border-b border-border">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="group flex items-center justify-between gap-4 py-4 text-sm font-medium text-ink transition-colors hover:text-brand"
                      >
                        <span>
                          {study.client}: {study.title}
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
            ) : null}
          </div>
        </Section>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface py-24 sm:py-28">
          <Container>
            <Reveal>
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                More frameworks
              </h2>
              <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-steel">
                Strategic reading before the conversation.
              </p>
            </Reveal>
            <Reveal className="mt-10 border-t border-border" delay={0.06}>
              <ul>
                {related.map((item) => (
                  <li key={item.slug} className="border-b border-border">
                    <Link
                      href={`/insights/${item.slug}`}
                      className="group grid gap-3 py-6 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6"
                    >
                      <span className="text-xs font-medium tracking-[0.14em] text-steel uppercase sm:col-span-3">
                        {item.category}
                      </span>
                      <span className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink group-hover:text-brand sm:col-span-5 sm:text-xl">
                        {item.title}
                      </span>
                      <span className="text-sm leading-relaxed text-steel sm:col-span-3">
                        {item.excerpt}
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
    </>
  );
}
