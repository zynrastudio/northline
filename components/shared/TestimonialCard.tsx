import Image from "next/image";
import type { Testimonial } from "@/content/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-white p-6 sm:p-8">
      <blockquote className="flex-1 text-base leading-relaxed text-ink sm:text-lg">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : null}
        <div>
          <p className="font-semibold text-ink">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.company}</p>
        </div>
      </figcaption>
    </figure>
  );
}
