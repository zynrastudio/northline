import Image from "next/image";
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
        <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_28px_64px_-36px_rgba(20,22,26,0.45)]">
          <Image
            src="/images/shared/cta-band.jpg"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
            priority={false}
          />
          {/* Brand wash keeps Soft Structuralism structure visible while locking teal CTA identity */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-brand/88 via-brand/82 to-[#0f3d46]/88"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative flex flex-col gap-10 px-8 py-14 sm:px-12 sm:py-16 md:flex-row md:items-center md:justify-between lg:px-16 lg:py-[4.5rem]">
            <div className="max-w-xl">
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {title}
              </h2>
              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-white/80 sm:text-lg">
                {description}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href={primaryHref} variant="inverse" withArrow>
                {primaryLabel}
              </Button>
              {secondaryLabel ? (
                <Button href={secondaryHref} variant="ghost">
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
