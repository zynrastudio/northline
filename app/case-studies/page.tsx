import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { caseStudies, getFeaturedCaseStudies } from "@/content/case-studies";
import { CtaBand } from "@/components/shared/CtaBand";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Challenge, strategy, execution, and business outcomes from Northline engagements.",
  path: "/case-studies",
});

/**
 * Soft Structuralism + Editorial listing.
 * Featured lead + quiet roster — not equal card grids.
 */
export default function CaseStudiesPage() {
  const featuredList = getFeaturedCaseStudies(4);
  const [featured, ...restFeatured] = featuredList;
  const rest = [
    ...restFeatured,
    ...caseStudies.filter(
      (study) => !featuredList.some((f) => f.slug === study.slug),
    ),
  ];

  return (
    <>
      <PageHero
        title="Proof in the work."
        description="Outcome-led narratives. Challenge through lessons learned, not a visual gallery."
        showCtas
      />

      <section className="bg-surface py-24 sm:py-28 lg:py-32">
        <Container>
          {featured ? (
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-5">
                <p className="text-xs font-medium tracking-[0.16em] text-steel uppercase">
                  {featured.industry}
                </p>
                <p className="mt-3 text-sm font-medium text-brand">
                  {featured.client}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  <Link
                    href={`/case-studies/${featured.slug}`}
                    className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-steel sm:text-lg">
                  {featured.summary}
                </p>
                <Link
                  href={`/case-studies/${featured.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
                >
                  Read the engagement
                  <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                </Link>
              </Reveal>

              <Reveal className="lg:col-span-7" delay={0.08}>
                <Link
                  href={`/case-studies/${featured.slug}`}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  <DoubleBezel>
                    <div className="relative aspect-[5/4] sm:aspect-[16/10]">
                      <Image
                        src={featured.hero}
                        alt={featured.heroAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover"
                      />
                    </div>
                  </DoubleBezel>
                </Link>
              </Reveal>
            </div>
          ) : null}

          {rest.length > 0 ? (
            <Reveal className="mt-16 border-t border-border sm:mt-20" delay={0.1}>
              <ul>
                {rest.map((item) => (
                  <li key={item.slug} className="border-b border-border">
                    <Link
                      href={`/case-studies/${item.slug}`}
                      className="group grid gap-3 py-6 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6"
                    >
                      <span className="text-xs font-medium tracking-[0.14em] text-steel uppercase sm:col-span-3">
                        {item.industry}
                      </span>
                      <span className="min-w-0 sm:col-span-4">
                        <span className="block text-sm font-medium text-brand">
                          {item.client}
                        </span>
                        <span className="mt-1 block font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink group-hover:text-brand sm:text-xl">
                          {item.title}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed text-steel sm:col-span-4">
                        {item.summary}
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
        title="Want this level of clarity on your next engagement."
        description="Book a strategy consultation and we will pressure-test the fit."
      />
    </>
  );
}
