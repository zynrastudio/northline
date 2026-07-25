import Image from "next/image";
import { homeContent } from "@/content/home";
import { cta } from "@/lib/nav";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export function HomeHero() {
  const { brand, headline, support, image, imageAlt } = homeContent.hero;

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-ink">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/72 to-ink/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25"
      />

      <Container className="relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-24">
        <div className="max-w-2xl">
          <p className="font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            {brand}
          </p>
          <h1 className="mt-4 max-w-[18ch] font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-white/80 sm:text-lg">
            {support}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={cta.primary.href} withArrow>
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="ghost">
              {cta.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
