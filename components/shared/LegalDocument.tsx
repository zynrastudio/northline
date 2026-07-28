import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";

export type LegalSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalDocument({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-[68ch]">
            <p className="text-sm font-medium uppercase tracking-wide text-steel">
              Last updated {updated}
            </p>

            <div className="mt-10 space-y-12">
              {sections.map((section, index) => (
                <section key={section.heading}>
                  <h2 className="flex items-baseline gap-3 font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink sm:text-2xl">
                    <span className="text-sm font-medium text-brand tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>

                  {section.body?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="mt-4 text-base leading-relaxed text-steel"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((item) => (
                        <li
                          key={item.slice(0, 32)}
                          className="flex gap-3 text-base leading-relaxed text-steel"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
