import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { industries } from "@/content/industries";
import { IndustryMark } from "@/components/industries/IndustryMark";
import { CtaBand } from "@/components/shared/CtaBand";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries",
  description:
    "Northline partners with professional services, SaaS, industrial, manufacturing, and technology teams.",
  path: "/industries",
});

/**
 * Soft Structuralism + Editorial listing.
 * Featured sector + quiet roster with line marks — no equal card grid.
 */
export default function IndustriesPage() {
  const [featured, ...rest] = industries;

  return (
    <>
      <PageHero
        title="Built for a focused set of B2B sectors."
        description="We go deep in a handful of industries so pattern recognition works for you, not against you."
        showCtas
      />

      <section className="bg-surface py-24 sm:py-28 lg:py-32">
        <Container>
          {featured ? (
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-6">
                <p className="text-xs font-medium tracking-[0.16em] text-steel uppercase">
                  Featured sector
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  <Link
                    href={`/industries/${featured.slug}`}
                    className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {featured.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm font-medium text-brand">
                  {featured.tagline}
                </p>
                <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-steel sm:text-lg">
                  {featured.understanding}
                </p>
                <Link
                  href={`/industries/${featured.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
                >
                  Explore {featured.name}
                  <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                </Link>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:justify-self-end" delay={0.08}>
                <Link
                  href={`/industries/${featured.slug}`}
                  className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  <div className="rounded-[1.75rem] border border-ink/5 bg-ink/[0.03] p-2 shadow-[0_22px_50px_-28px_rgba(20,22,26,0.35)]">
                    <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-[calc(1.75rem-0.5rem)] bg-surface-elevated shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] sm:aspect-[5/4]">
                      <Image
                        src={featured.icon}
                        alt=""
                        width={220}
                        height={220}
                        unoptimized
                        priority
                        className="h-[55%] w-[55%]"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          ) : null}

          {rest.length > 0 ? (
            <Reveal className="mt-16 border-t border-border sm:mt-20" delay={0.1}>
              <ul>
                {rest.map((industry) => (
                  <li key={industry.slug} className="border-b border-border">
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="group grid gap-4 py-7 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6"
                    >
                      <span className="sm:col-span-2">
                        <IndustryMark
                          src={industry.icon}
                          name={industry.name}
                          size="sm"
                        />
                      </span>
                      <span className="min-w-0 sm:col-span-4">
                        <span className="block font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink group-hover:text-brand sm:text-xl">
                          {industry.name}
                        </span>
                        <span className="mt-1 block text-sm font-medium text-brand">
                          {industry.tagline}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed text-steel sm:col-span-5">
                        {industry.buyerPromise}
                      </span>
                      <span className="sm:col-span-1 sm:justify-self-end">
                        <ArrowRight
                          weight="bold"
                          className="h-4 w-4 text-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <CtaBand
        title="Work in a sector we know."
        description="Book a strategy consultation and we will bring the relevant patterns to the first call."
      />
    </>
  );
}
