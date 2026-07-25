import { aboutContent } from "@/content";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** Asymmetric 7/5 · 5/7 rhythm so the four commitments never read as equal cards. */
const spans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export function HowWeOperate() {
  const { values } = aboutContent;

  return (
    <section className="bg-surface-muted py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="How we operate"
          description="Four commitments that decide whether the work produces pipeline."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {values.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 0.06}
              className={`${spans[index] ?? "md:col-span-6"} h-full`}
            >
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-ink/5 bg-surface-elevated p-8 shadow-[0_24px_60px_-40px_rgba(20,22,26,0.5),inset_0_1px_0_rgba(255,255,255,0.85)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_40px_80px_-45px_rgba(20,22,26,0.55),inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-10">
                <div className="flex items-start justify-between gap-6">
                  <span className="font-[family-name:var(--font-outfit)] text-5xl font-medium tracking-tight tabular-nums text-ink/10 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-brand/70 sm:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="mt-4 h-px w-10 bg-border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-16 group-hover:bg-brand"
                  />
                </div>

                <div className="mt-10">
                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-steel">
                    {value.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
