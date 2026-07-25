import { aboutContent, siteSettings } from "@/content";
import { Button } from "@/components/shared/Button";
import { ContentImage } from "@/components/shared/ContentImage";
import { Section } from "@/components/shared/SectionHeading";

export function HomeAboutPreview() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <ContentImage
          src="/images/pages/about-preview.jpg"
          alt="Northline Creative studio workspace"
          aspect="photo"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            About us
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A creative partner for modern businesses
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {aboutContent.overview}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {siteSettings.companyName} brings together design, development, and
            marketing so your brand and website work together with quality and care.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">
              Learn about us
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
