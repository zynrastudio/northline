import Image from "next/image";
import { aboutContent, siteSettings, teamMembers } from "@/content";
import { HowWeOperate } from "@/components/about/HowWeOperate";
import { CtaBand } from "@/components/shared/CtaBand";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { TeamMemberCard } from "@/components/shared/TeamMemberCard";
import { cta } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Northline Creative is a strategic B2B growth partner. Operators and strategists accountable for pipeline, not just deliverables.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate min-h-[70dvh] overflow-hidden bg-ink">
        <Image
          src="/images/home/phase-d-photo-01-hero-workshop.png"
          alt="Northline strategists reviewing a growth plan together"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/30"
        />
        <Container className="relative flex min-h-[70dvh] flex-col justify-end pb-14 pt-32 sm:pb-16">
          <p className="text-sm font-medium tracking-wide text-white/70 uppercase">
            About
          </p>
          <h1 className="mt-3 max-w-[16ch] font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            A growth partner, not a vendor.
          </h1>
          <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-white/80 sm:text-lg">
            {aboutContent.positioningStatement}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={cta.primary.href} withArrow>
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} variant="ghost">
              {cta.secondary.label}
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              What we do
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
              {aboutContent.overview}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.06}>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Why we do it
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
              {aboutContent.mission}
            </p>
          </Reveal>
        </div>
      </Section>

      <HowWeOperate />

      <Section>
        <SectionHeading
          title="Who you work with"
          description="Operators and strategists who stay accountable from diagnosis through growth."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Section>

      <CtaBand
        title={`Consider ${siteSettings.companyName} for the next phase.`}
        description="Book a strategy consultation and see how we would approach your growth."
      />
    </>
  );
}
