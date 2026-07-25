import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    slug: "five-ways-to-refresh-your-business-website",
    title: "Five Ways to Refresh Your Business Website",
    excerpt:
      "Simple updates that can make your existing site feel clearer, more modern, and easier for visitors to navigate.",
    body: `A full redesign is not always necessary. Many businesses can improve their online presence with focused updates.

Start by clarifying your homepage message so visitors understand what you do within a few seconds. Then review your services pages for consistency, update outdated photography, tighten contact calls to action, and check that key pages work well on mobile.

Small, practical improvements often create a stronger first impression without a complete rebuild.`,
    date: "2026-05-12",
    cover: "/images/blog/website-refresh.jpg",
    tags: ["websites", "tips"],
  },
  {
    slug: "what-to-include-in-a-brand-guidelines-document",
    title: "What to Include in a Brand Guidelines Document",
    excerpt:
      "A practical checklist for logos, color, typography, and usage rules your team can actually follow.",
    body: `Brand guidelines help your team and partners use your identity consistently.

A useful guide typically covers logo variations and clear space, primary and secondary colors, typography pairings, photography direction, and do's and don'ts for everyday applications. Keep the document approachable—guidelines only help when people can apply them quickly.

If you are preparing for a rebrand or website launch, establishing these rules early saves time later.`,
    date: "2026-04-28",
    cover: "/images/blog/brand-guidelines.jpg",
    tags: ["branding", "design"],
  },
  {
    slug: "northline-studio-notes-spring",
    title: "Studio Notes: Spring at Northline",
    excerpt:
      "A quick update from the team on recent projects, new process improvements, and what we are exploring next.",
    body: `Spring has been a busy season at Northline. We wrapped several website and branding engagements, refined our project kickoff checklist, and expanded our content support offerings.

We are also continuing to invest in better collaboration between design and development so launches feel smoother for clients.

Thanks to the teams who trusted us with their projects this quarter—we are looking forward to the work ahead.`,
    date: "2026-04-03",
    cover: "/images/blog/studio-notes-spring.jpg",
    tags: ["agency", "updates"],
  },
  {
    slug: "design-inspiration-clean-corporate-layouts",
    title: "Design Inspiration: Clean Corporate Layouts",
    excerpt:
      "Layout patterns we like for professional service sites—generous spacing, clear hierarchy, and calm visuals.",
    body: `Corporate websites do not need to feel cold. Clean layouts with strong hierarchy, consistent spacing, and quality photography can feel both professional and approachable.

We often look at how successful service brands structure hero sections, service grids, and contact prompts. The goal is not to copy trends, but to borrow clarity: one message per section, obvious next steps, and visuals that support the story.

Inspiration works best when it helps your team make faster, more confident design decisions.`,
    date: "2026-03-18",
    cover: "/images/blog/corporate-layouts.jpg",
    tags: ["design", "inspiration"],
  },
  {
    slug: "a-simple-checklist-for-marketing-campaign-assets",
    title: "A Simple Checklist for Marketing Campaign Assets",
    excerpt:
      "Before you launch, make sure your landing page, ads, and email creative are aligned.",
    body: `Campaigns move quickly, and assets can drift out of sync. Before launch, confirm that your landing page headline matches ad messaging, imagery feels consistent across channels, and contact or conversion points are obvious.

Also check mobile rendering, file sizes, and brand guideline compliance. A short internal review can prevent mixed signals and last-minute fixes.

When creative, copy, and destination pages work together, campaigns are easier to measure and improve.`,
    date: "2026-02-25",
    cover: "/images/blog/campaign-assets.jpg",
    tags: ["marketing", "tips"],
  },
  {
    slug: "why-clear-service-pages-matter",
    title: "Why Clear Service Pages Matter",
    excerpt:
      "Visitors should quickly understand what you offer, who it is for, and how to get in touch.",
    body: `Service pages are often the bridge between curiosity and contact. When they are vague, prospects leave unsure whether you are the right fit.

Effective service pages explain the offering in plain language, outline what clients can expect, show relevant examples, and invite a conversation. You do not need an exhaustive process narrative—just enough clarity to build confidence.

If your services have grown over time, a content pass on these pages is one of the highest-leverage website improvements you can make.`,
    date: "2026-01-30",
    cover: "/images/blog/service-pages.jpg",
    tags: ["websites", "content"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentBlogPosts(limit = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return getRecentBlogPosts(limit);

  const currentTags = new Set(current.tags ?? []);

  const scored = blogPosts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const shared = (post.tags ?? []).filter((tag) => currentTags.has(tag)).length;
      return { post, shared };
    })
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .map(({ post }) => post);

  return scored.slice(0, limit);
}
