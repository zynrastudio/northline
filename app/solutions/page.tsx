import Link from "next/link";
import Image from "next/image";
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

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="One growth system, four pillars."
        description="We organize the work around how buyers decide and how your business grows, not a menu of disconnected services."
        showCtas
      />

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-16 sm:gap-20">
            {solutionPillars.map((pillar, index) => {
              const media = pillarImage[pillar.slug];
              const flip = index % 2 === 1;
              return (
                <Reveal key={pillar.slug}>
                  <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                    <div
                      className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                    >
                      <DoubleBezel>
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover"
                          />
                        </div>
                      </DoubleBezel>
                    </div>
                    <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                      <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                        {pillar.title}
                      </h2>
                      <p className="mt-3 text-lg font-medium text-brand">
                        {pillar.tagline}
                      </p>
                      <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-steel">
                        {pillar.businessOutcome}
                      </p>
                      <Link
                        href={`/solutions/${pillar.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
                      >
                        Explore {pillar.title}
                        <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
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
