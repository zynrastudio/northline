import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

type CtaBandProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBand({
  title = "Ready to start your next project?",
  description = "Tell us about your business and how we can help. We would love to hear from you.",
  primaryLabel = "Contact Us",
  primaryHref = "/contact",
  secondaryLabel = "View Portfolio",
  secondaryHref = "/portfolio",
}: CtaBandProps) {
  return (
    <section className="bg-brand py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-blue-100 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={primaryHref}
              className="bg-white text-brand hover:bg-blue-50"
            >
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              variant="secondary"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
