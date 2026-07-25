import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { homeContent } from "@/content/home";
import { cta } from "@/lib/nav";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";

export function HomePositioning() {
  const { headline, body, image, imageAlt } = homeContent.positioning;

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative lg:col-span-5">
            <span
              aria-hidden
              className="absolute -left-4 top-1 hidden h-full w-px bg-brand sm:block lg:-left-6"
            />
            <h2 className="max-w-[12ch] font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {headline}
            </h2>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-steel sm:text-lg">
              {body}
            </p>
            <Link
              href={cta.supporting.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 transition-colors hover:underline"
            >
              {cta.supporting.label}
              <ArrowRight weight="bold" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <DoubleBezel>
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </DoubleBezel>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
