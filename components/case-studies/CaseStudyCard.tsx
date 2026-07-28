import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { CaseStudy } from "@/content/types";
import { DoubleBezel } from "@/components/shared/DoubleBezel";

type CaseStudyCardProps = {
  study: CaseStudy;
};

/**
 * Compact teaser for pillar/industry surfaces.
 * Prefer editorial lists on the Case Studies index.
 */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <DoubleBezel>
        <div className="relative aspect-video bg-surface-muted">
          <Image
            src={study.hero}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
          />
        </div>
      </DoubleBezel>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-xs font-medium tracking-wide text-steel uppercase">
          {study.industry}
        </p>
        <p className="mt-2 text-sm font-medium text-brand">{study.client}</p>
        <h3 className="mt-1 font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink group-hover:text-brand">
          {study.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-steel sm:text-base">
          {study.summary}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand">
          Read the engagement
          <ArrowRight
            weight="bold"
            className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
