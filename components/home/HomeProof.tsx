import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { homeContent } from "@/content/home";
import { cta } from "@/lib/nav";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";

export function HomeProof() {
  const { headline, body, items } = homeContent.proof;

  return (
    <section className="bg-surface pb-24 sm:pb-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h2 className="max-w-[10ch] font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
            <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-steel">
              {body}
            </p>
            <Link
              href={cta.secondary.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              {cta.secondary.label}
              <ArrowRight weight="bold" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {items.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06}>
                <Link
                  href={`/case-studies/${item.slug}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <DoubleBezel>
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </DoubleBezel>
                  <h3 className="mt-5 font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium tracking-wide text-steel uppercase">
                    {item.industry}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-steel sm:text-base">
                    {item.outcome}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
