import { projects } from "@/content";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Browse selected Northline Creative projects across healthcare, finance, retail, technology, and more.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work"
        description="A selection of websites, branding, and digital projects for businesses across many industries."
        showCtas
        imageSrc="/images/pages/portfolio-hero.jpg"
        imageAlt="Selected Northline portfolio work"
        priority
      />

      <Section>
        <SectionHeading
          title="Our projects"
          description="Browse work across healthcare, finance, retail, technology, manufacturing, education, hospitality, and more."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have a project in mind?"
        description="Tell us about your business and we will discuss how we can help."
      />
    </>
  );
}
