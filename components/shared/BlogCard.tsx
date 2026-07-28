import Link from "next/link";
import type { BlogPost } from "@/content/types";
import { ContentImage } from "@/components/shared/ContentImage";
import { formatDate } from "@/lib/format";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-colors hover:border-brand/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <ContentImage
        src={post.cover}
        alt=""
        aspect="video"
        className="rounded-none"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {formatDate(post.date)}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-ink group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-base">
          {post.excerpt}
        </p>
        <span className="mt-4 text-sm font-medium text-brand">Read article →</span>
      </div>
    </Link>
  );
}
