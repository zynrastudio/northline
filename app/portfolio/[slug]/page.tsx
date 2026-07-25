import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { CtaBand } from "@/components/shared/CtaBand";
import { buildMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <ProjectDetail project={project} />
      <CtaBand
        title="Like what you see?"
        description="Contact us to talk about your next website, branding, or marketing project."
      />
    </>
  );
}
