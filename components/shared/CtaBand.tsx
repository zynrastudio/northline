import { cta } from "@/lib/nav";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

type CtaBandProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Omit or pass null to show a single primary CTA (no duplicate intent). */
  secondaryLabel?: string | null;
  secondaryHref?: string;
};

export function CtaBand({
  title = "Ready for a clearer growth path.",
  description = "Book a strategy consultation and map your next move.",
  primaryLabel = cta.primary.label,
  primaryHref = cta.primary.href,
  secondaryLabel = null,
  secondaryHref = cta.secondary.href,
}: CtaBandProps) {
  return (
    <section className="bg-surface pb-24 sm:pb-28">
      <Container>
        <div className="flex flex-col gap-10 rounded-[1.5rem] bg-brand px-8 py-14 sm:px-12 sm:py-16 md:flex-row md:items-end md:justify-between lg:px-16">
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {title}
            </h2>
            <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-white/80 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={primaryHref}
              withArrow
              className="bg-white text-brand hover:bg-brand-subtle"
            >
              {primaryLabel}
            </Button>
            {secondaryLabel ? (
              <Button href={secondaryHref} variant="ghost">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
