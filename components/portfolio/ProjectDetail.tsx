import Link from "next/link";
import { getServiceBySlug } from "@/content";
import type { Project } from "@/content/types";
import { ContentImage } from "@/components/shared/ContentImage";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const projectServices = project.services
    .map((slug) => getServiceBySlug(slug))
    .filter((service) => service != null);

  return (
    <>
      <section className="border-b border-border bg-surface-muted">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            {project.industry}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {project.summary}
          </p>
          <div className="mt-10">
            <ContentImage
              src={project.hero}
              alt={`${project.title} hero image`}
              aspect="wide"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {project.overview}
            </p>
          </div>

          <aside className="rounded-[var(--radius-card)] border border-border bg-surface-muted p-6">
            <h2 className="text-lg font-semibold text-ink">Services provided</h2>
            <ul className="mt-4 space-y-2">
              {projectServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-medium text-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Industry</p>
            <p className="mt-1 text-sm font-medium text-ink">{project.industry}</p>
          </aside>
        </div>
      </Section>

      <Section className="bg-surface-muted">
        <SectionHeading
          title="Project gallery"
          description="A visual look at the finished work."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {project.gallery.map((image, index) => (
            <ContentImage
              key={image}
              src={image}
              alt={`${project.title} gallery image ${index + 1}`}
              aspect="photo"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ))}
        </div>
      </Section>
    </>
  );
}
