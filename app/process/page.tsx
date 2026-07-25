import Image from "next/image";
import { processIntro, processSteps } from "@/content";
import { CtaBand } from "@/components/shared/CtaBand";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Process",
  description:
    "How Northline engages, qualifies, and delivers strategic digital work in the open.",
  path: "/process",
});

const stepDetail: Record<string, string> = {
  Diagnose:
    "You get a clear read on where the current presence helps and where it leaks, plus agreement on the numbers this engagement has to move.",
  Design:
    "You see positioning, journey, and interface argued together before anything is built, so there are no surprises at handoff.",
  Build:
    "You get a fast, accessible site wired into the tools your team already uses, with qualification and routing handled automatically.",
  Grow:
    "You get a quarterly cadence of content, experiments, and reporting so results compound instead of plateauing after launch.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        title="How engagements actually run."
        description={processIntro}
        showCtas
      />

      <section className="bg-surface pb-4 sm:pb-8">
        <Container>
          <Reveal>
            <DoubleBezel>
              <div className="relative aspect-[21/9]">
                <Image
                  src="/images/home/phase-d-photo-03-whiteboard-strategy.png"
                  alt="Strategy whiteboard mapping context, problems, and next steps"
                  fill
                  priority
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-cover"
                />
              </div>
            </DoubleBezel>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {processSteps.map((step) => (
              <Reveal key={step.action}>
                <div className="grid gap-6 py-10 md:grid-cols-12 md:items-baseline">
                  <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink md:col-span-4 sm:text-3xl">
                    {step.action}
                  </h2>
                  <div className="md:col-span-8">
                    <p className="text-base leading-relaxed text-ink sm:text-lg">
                      {step.summary}
                    </p>
                    <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-steel">
                      {stepDetail[step.action]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="See how this maps to your goals."
        description="Book a strategy consultation and we will walk the first two steps together."
      />
    </>
  );
}
