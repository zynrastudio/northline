import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { homeContent } from "@/content/home";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";

export function HomeInsights() {
  const { headline, featured, image, imageAlt, items } = homeContent.insights;

  return (
    <section className="bg-surface pb-24 sm:pb-32">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <h2 className="max-w-[12ch] font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
            <p className="mt-8 text-xs font-medium tracking-[0.16em] text-steel uppercase">
              {featured.category}
            </p>
            <p className="mt-3 font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {featured.title}
            </p>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-steel">
              {featured.body}
            </p>
            <Link
              href={featured.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              Read insights
              <ArrowRight weight="bold" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <DoubleBezel>
              <div className="relative aspect-[5/4] sm:aspect-[16/10]">
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

        <Reveal className="mt-14 border-t border-border" delay={0.1}>
          <ul>
            {items.map((item) => (
              <li key={item.title} className="border-b border-border">
                <Link
                  href={item.href}
                  className="group grid gap-3 py-6 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6"
                >
                  <span className="text-xs font-medium tracking-[0.14em] text-steel uppercase sm:col-span-3">
                    {item.category}
                  </span>
                  <span className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink sm:col-span-4 sm:text-xl">
                    {item.title}
                  </span>
                  <span className="text-sm leading-relaxed text-steel sm:col-span-4">
                    {item.body}
                  </span>
                  <span className="sm:col-span-1 sm:justify-self-end">
                    <ArrowRight
                      weight="bold"
                      className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
