import type { BlogPost } from "@/content/types";

type BlogBodyProps = {
  post: BlogPost;
};

/** Renders plain seeded blog body text as paragraphs (brochure-depth, not MDX). */
export function BlogBody({ post }: BlogBodyProps) {
  const paragraphs = post.body
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

  return (
    <div className="space-y-5 text-base leading-relaxed text-ink sm:text-lg">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
