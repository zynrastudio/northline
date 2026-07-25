import { getFeaturedProjects } from "@/content";
import { cta } from "@/lib/nav";
import { Button } from "@/components/shared/Button";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

export function HomeProjects() {
  const projects = getFeaturedProjects(4);

  return (
    <Section className="bg-surface">
      <SectionHeading
        title="Featured projects"
        description="A look at recent websites, branding, and digital work across a range of industries."
        action={
          <Button href={cta.secondary.href} variant="secondary">
            {cta.secondary.label}
          </Button>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
