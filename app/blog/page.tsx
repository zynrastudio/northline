import { blogPosts } from "@/content";
import { BlogCard } from "@/components/shared/BlogCard";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Agency updates, marketing tips, and design inspiration from Northline Creative.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas and updates from the studio"
        description="Agency notes, marketing tips, and design inspiration for growing businesses."
        showCtas
        imageSrc="/images/pages/blog-hero.jpg"
        imageAlt="Studio desk with creative materials"
        priority
      />

      <Section>
        <SectionHeading
          title="Latest articles"
          description="Practical ideas and studio updates from the Northline team."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Need help with your next project?"
        description="Reach out to discuss websites, branding, marketing, and more."
      />
    </>
  );
}
