import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { ContentImage } from "@/components/shared/ContentImage";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface-elevated transition-shadow hover:shadow-[0_20px_50px_-28px_rgba(20,22,26,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <ContentImage
        src={study.hero}
        alt=""
        aspect="video"
        className="rounded-none"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium tracking-wide text-steel uppercase">
          {study.industry}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink group-hover:text-brand">
          {study.client}
        </h3>
        <p className="mt-1 text-sm font-medium text-ink/80">{study.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-steel sm:text-base">
          {study.summary}
        </p>
      </div>
    </Link>
  );
}
