import { ContentImage } from "@/components/shared/ContentImage";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  showCtas?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  priority?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  showCtas = false,
  imageSrc,
  imageAlt,
  priority = false,
}: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface-muted">
      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20">
        <div>
          {eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-wide text-brand">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {description}
          </p>
          {showCtas ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Contact Us</Button>
              <Button href="/portfolio" variant="secondary">
                View Portfolio
              </Button>
            </div>
          ) : null}
        </div>
        {imageSrc && imageAlt ? (
          <ContentImage
            src={imageSrc}
            alt={imageAlt}
            aspect="photo"
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : null}
      </Container>
    </section>
  );
}
