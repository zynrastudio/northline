import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { industries } from "@/content/industries";
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

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Built for a focused set of B2B sectors."
        description="We go deep in a handful of industries so pattern recognition works for you, not against you."
        showCtas
      />

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.05}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-panel)] border border-border bg-surface-elevated p-8 transition-colors hover:border-brand/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                    {industry.name}
                  </h2>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-steel">
                    {industry.understanding}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">
                    View {industry.name}
                    <ArrowRight
                      weight="bold"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Work in a sector we know."
        description="Book a strategy consultation and we will bring the relevant patterns to the first call."
      />
    </>
  );
}
