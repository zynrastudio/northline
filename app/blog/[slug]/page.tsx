import { notFound } from "next/navigation";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/content";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { CtaBand } from "@/components/shared/CtaBand";
import { buildMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedBlogPosts(post.slug, 3);

  return (
    <>
      <BlogArticle post={post} related={related} />
      <CtaBand
        title="Want to work together?"
        description="Contact Northline to talk about your website, brand, or next campaign."
      />
    </>
  );
}
