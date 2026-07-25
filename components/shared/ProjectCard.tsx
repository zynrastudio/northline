import Link from "next/link";
import type { Project } from "@/content/types";
import { ContentImage } from "@/components/shared/ContentImage";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/case-studies/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <ContentImage
        src={project.hero}
        alt=""
        aspect="video"
        className="rounded-none"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">
          {project.industry}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-ink group-hover:text-brand">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          {project.summary}
        </p>
      </div>
    </Link>
  );
}
