import Image from "next/image";
import Link from "next/link";
import type { Insight } from "@/content/types";
import { DoubleBezel } from "@/components/shared/DoubleBezel";

type InsightCardProps = {
  insight: Insight;
};

/** Compact teaser — prefer editorial list layouts on Insights surfaces. */
export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <DoubleBezel>
        <div className="relative aspect-video bg-surface-muted">
          <Image
            src={insight.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
          />
        </div>
      </DoubleBezel>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-xs font-medium tracking-wide text-steel uppercase">
          {insight.category}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink group-hover:text-brand">
          {insight.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-steel sm:text-base">
          {insight.excerpt}
        </p>
      </div>
    </Link>
  );
}
