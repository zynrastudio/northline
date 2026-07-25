import { testimonials } from "@/content";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";

export function HomeTestimonials() {
  return (
    <Section className="bg-surface-muted">
      <SectionHeading
        eyebrow="Client feedback"
        title="What our clients say"
        description="Businesses trust Northline for creative work that feels professional, friendly, and reliable."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </Section>
  );
}
