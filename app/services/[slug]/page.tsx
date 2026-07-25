import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getServiceBySlug,
  services,
} from "@/content";
import { CtaBand } from "@/components/shared/CtaBand";
import { ContentImage } from "@/components/shared/ContentImage";
import { PageHero } from "@/components/shared/PageHero";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const exampleProjects = service.relatedProjectSlugs
    .map((projectSlug) => getProjectBySlug(projectSlug))
    .filter((project) => project != null);

  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        showCtas
        imageSrc={service.image}
        imageAlt={`${service.title} service`}
        priority
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              Overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {service.overview}
            </p>
          </div>
          <ContentImage
            src={service.image}
            alt={`${service.title} visual`}
            aspect="photo"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Section>

      <Section className="bg-surface-muted">
        <SectionHeading
          title="Benefits"
          description="Practical advantages of working with Northline on this service."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex gap-3 rounded-[var(--radius-card)] border border-border bg-white p-5 text-base text-ink"
            >
              <span
                aria-hidden
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand"
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </Section>

      {exampleProjects.length > 0 ? (
        <Section>
          <SectionHeading
            title="Example projects"
            description="Selected work related to this service."
            action={
              <Link
                href="/portfolio"
                className="text-sm font-medium text-brand hover:text-brand-dark"
              >
                View Portfolio →
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exampleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="border-t border-border bg-surface-muted">
        <SectionHeading
          title="Explore more services"
          description="Northline offers a full suite of creative digital services."
        />
        <div className="flex flex-wrap gap-3">
          {otherServices.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title={`Let's talk about ${service.title.toLowerCase()}`}
        description="Share a few details about your project and we will follow up to discuss next steps."
      />
    </>
  );
}
