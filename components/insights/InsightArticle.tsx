import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/format";
import { getCaseStudyBySlug } from "@/content/case-studies";
import type { Insight } from "@/content/types";
import { InsightEngagement } from "@/components/analytics/EngagementEvents";
import { InsightBody } from "@/components/insights/InsightBody";
import { InsightCard } from "@/components/insights/InsightCard";
import { ContentImage } from "@/components/shared/ContentImage";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

type InsightArticleProps = {
  insight: Insight;
  related: Insight[];
};

export function InsightArticle({ insight, related }: InsightArticleProps) {
  const relatedCases = (insight.relatedCaseStudySlugs ?? [])
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((study) => study != null);

  return (
    <>
      <InsightEngagement slug={insight.slug} category={insight.category} />

      <article>
        <header className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-3xl px-4 py-14 pt-28 sm:px-6 sm:py-16 sm:pt-32 lg:px-8">
            <p className="text-sm font-medium tracking-wide text-brand uppercase">
              {insight.category}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              {insight.title}
            </h1>
            <p className="mt-4 text-sm text-steel">
              <time dateTime={insight.date}>{formatDate(insight.date)}</time>
            </p>
            <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-steel">
              {insight.excerpt}
            </p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <ContentImage
            src={insight.cover}
            alt={insight.coverAlt}
            aspect="wide"
            className="mb-10"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <InsightBody body={insight.body} />

          {relatedCases.length > 0 ? (
            <div className="mt-12 border-t border-border pt-10">
              <h2 className="font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink">
                Related case studies
              </h2>
              <ul className="mt-4 space-y-3">
                {relatedCases.map((study) => (
                  <li key={study.slug}>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
                    >
                      {study.client}: {study.title}
                      <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <Section className="border-t border-border bg-surface-muted">
          <SectionHeading
            title="More frameworks"
            description="Strategic reading before the conversation."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <InsightCard key={item.slug} insight={item} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
