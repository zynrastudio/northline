import Link from "next/link";
import type { Service } from "@/content/types";
import { ContentImage } from "@/components/shared/ContentImage";

type ServiceCardProps = {
  service: Service;
  showImage?: boolean;
};

export function ServiceCard({ service, showImage = true }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-colors hover:border-brand/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      {showImage ? (
        <div className="relative">
          <ContentImage
            src={service.image}
            alt=""
            aspect="video"
            className="rounded-none"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute left-3 top-3 rounded-lg bg-white/95 p-1.5 shadow-sm">
            <img
              src={`/images/icons/${service.slug}.svg`}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9"
            />
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-semibold text-ink group-hover:text-brand">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-base">
          {service.shortDescription}
        </p>
        <span className="mt-4 text-sm font-medium text-brand">Learn more →</span>
      </div>
    </Link>
  );
}
