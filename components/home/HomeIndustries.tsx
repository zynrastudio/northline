import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { homeContent } from "@/content/home";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";

export function HomeIndustries() {
  const { headline, image, imageAlt, items } = homeContent.industries;

  return (
    <section className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div aria-hidden className="absolute inset-0 bg-surface/80" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {headline}
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 border-y border-border py-8 sm:gap-x-12 lg:gap-x-14">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2.5 text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated font-[family-name:var(--font-outfit)] text-xs font-medium text-brand">
                    {item.mark}
                  </span>
                  <span className="text-xs font-medium tracking-[0.14em] text-steel uppercase sm:text-[0.7rem]">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 text-center" delay={0.1}>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            Explore industries
            <ArrowRight weight="bold" className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
