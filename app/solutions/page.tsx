import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { solutionPillars } from "@/content/solutions";
import { pillarImage } from "@/lib/pillar-media";
import { cta } from "@/lib/nav";
import { CtaBand } from "@/components/shared/CtaBand";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Strategy, digital experiences, business automation, and growth enablement built around measurable business outcomes.",
  path: "/solutions",
});

/**
 * Soft Structuralism + alternating Editorial Split.
 * Media-led numbered cascade — distinct from Industries' featured + roster.
 */
export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="One growth system, four pillars."
        description="We organize the work around how buyers decide and how your business grows, not a menu of disconnected services."
        showCtas
      />

      <section className="border-b border-border bg-surface">
        <Container className="py-10 sm:py-12">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.16em] text-steel uppercase">
              The system
            </p>
            <ol className="mt-6 flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12">
              {solutionPillars.map((pillar, index) => (
                <li key={pillar.slug}>
                  <a
                    href={`#${pillar.slug}`}
                    className="group inline-flex items-baseline gap-2.5 text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span className="font-[family-name:var(--font-outfit)] text-xs font-medium tabular-nums tracking-wide text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium tracking-tight sm:text-base">
                      {pillar.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col gap-24 sm:gap-28 lg:gap-36">
            {solutionPillars.map((pillar, index) => {
              const media = pillarImage[pillar.slug];
              const flip = index % 2 === 1;
              const n = String(index + 1).padStart(2, "0");

              return (
                <Reveal key={pillar.slug}>
                  <article
                    id={pillar.slug}
                    className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
                  >
                    <div
                      className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                    >
                      <Link
                        href={`/solutions/${pillar.slug}`}
                        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                      >
                        <DoubleBezel>
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={media.src}
                              alt={media.alt}
                              fill
                              priority={index === 0}
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
                            />
                          </div>
                        </DoubleBezel>
                      </Link>
                    </div>

                    <div
                      className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
                    >
                      <p className="font-[family-name:var(--font-outfit)] text-sm font-medium tabular-nums tracking-[0.14em] text-brand">
                        {n}
                      </p>
                      <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                        <Link
                          href={`/solutions/${pillar.slug}`}
                          className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                          {pillar.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-base font-medium text-brand sm:text-lg">
                        {pillar.tagline}
                      </p>
                      <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-steel">
                        {pillar.problem}
                      </p>
                      <blockquote className="mt-6 border-l-2 border-brand/35 pl-4">
                        <p className="font-[family-name:var(--font-outfit)] text-lg font-medium leading-snug tracking-tight text-ink sm:text-xl">
                          {pillar.businessOutcome}
                        </p>
                      </blockquote>
                      <Link
                        href={`/solutions/${pillar.slug}`}
                        className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
                      >
                        Explore {pillar.title}
                        <ArrowRight
                          weight="bold"
                          className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which pillar you need."
        description={`That is what the first conversation is for. ${cta.primary.label} and we will map it with you.`}
      />
    </>
  );
}
