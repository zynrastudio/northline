import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/content/types";
import { BlogBody } from "@/components/blog/BlogBody";
import { ContentImage } from "@/components/shared/ContentImage";
import { BlogCard } from "@/components/shared/BlogCard";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

type BlogArticleProps = {
  post: BlogPost;
  related: BlogPost[];
};

export function BlogArticle({ post, related }: BlogArticleProps) {
  return (
    <>
      <article>
        <header className="border-b border-border bg-surface-muted">
          <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wide text-brand">
              Blog
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            {post.tags && post.tags.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-brand-subtle px-3 py-1 text-xs font-medium text-brand"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <ContentImage
            src={post.cover}
            alt=""
            aspect="wide"
            className="mb-10"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <BlogBody post={post} />
        </div>
      </article>

      {related.length > 0 ? (
        <Section className="border-t border-border bg-surface-muted">
          <SectionHeading
            title="Related articles"
            description="More updates, tips, and inspiration from the studio."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
