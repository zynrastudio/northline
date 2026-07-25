import { getRecentBlogPosts } from "@/content";
import { BlogCard } from "@/components/shared/BlogCard";
import { Button } from "@/components/shared/Button";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

export function HomeBlogPreview() {
  const posts = getRecentBlogPosts(3);

  return (
    <Section>
      <SectionHeading
        eyebrow="From the blog"
        title="Ideas, updates, and inspiration"
        description="Agency notes, marketing tips, and design inspiration for growing businesses."
        action={
          <Button href="/blog" variant="secondary">
            View all posts
          </Button>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
