import { services } from "@/content";
import { Button } from "@/components/shared/Button";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";

export function HomeServices() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Services designed to help your business grow"
        description="From websites and branding to marketing and content, we offer creative digital services for modern businesses."
        action={
          <Button href="/services" variant="secondary">
            All services
          </Button>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  );
}
