import { siteSettings } from "@/content";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { ContentImage } from "@/components/shared/ContentImage";

export function HomeHero() {
  return (
    <section className="border-b border-border bg-surface-muted">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            {siteSettings.companyName}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {siteSettings.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            We help businesses build their brand, grow online, and create digital
            experiences that feel professional and polished.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Contact Us</Button>
            <Button href="/portfolio" variant="secondary">
              View Portfolio
            </Button>
          </div>
        </div>
        <ContentImage
          src="/images/pages/home-hero.jpg"
          alt="Creative team collaborating in a modern office"
          aspect="photo"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </Container>
    </section>
  );
}
