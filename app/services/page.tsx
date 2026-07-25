import { services } from "@/content";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Northline Creative services including website design, branding, marketing, content, graphic design, and UI/UX.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Creative digital services for modern businesses"
        description="We offer a full range of design, marketing, and digital services to help you build your brand, grow your business, and reach more customers."
        imageSrc="/images/pages/services-hero.png"
        imageAlt="Digital design and marketing workspace"
        priority
      />

      <Section>
        <SectionHeading
          title="What we offer"
          description="Browse our services to learn how we can support your next project."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Not sure where to start?"
        description="Share your goals with us and we will help you find the right mix of services."
      />
    </>
  );
}
