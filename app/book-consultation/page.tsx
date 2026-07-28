import Link from "next/link";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { siteSettings } from "@/content";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { PageHero } from "@/components/shared/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Strategy Consultation",
  description:
    "Request a strategy consultation with Northline. We qualify fit before the first call so the conversation is useful for both sides.",
  path: "/book-consultation",
});

const expectations = [
  "A short reply confirming whether we are a fit",
  "A focused call on your goals, not a sales pitch",
  "A clear view of how we would approach the work",
];

const beforeYouAsk = [
  {
    label: "See the work",
    description: "Outcome-led case studies across B2B teams.",
    href: "/case-studies",
  },
  {
    label: "Read our process",
    description: "How an engagement actually runs, step by step.",
    href: "/process",
  },
];

export default function BookConsultationPage() {
  const { address } = siteSettings;

  return (
    <>
      <PageHero
        eyebrow="Book Strategy Consultation"
        title="Start with a clear conversation."
        description="Tell us where you are headed. We review every request and only take the call forward when we can genuinely help."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Consultation request
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-steel">
                Three short steps. The detail lets us prepare a genuinely useful
                first call, and tells you early if we are the right partner.
              </p>
              <div className="mt-8">
                <ConsultationForm />
              </div>
            </div>

            <aside className="h-fit">
              <DoubleBezel tone="elevated">
                <div className="p-6 sm:p-8">
                  <h2 className="font-[family-name:var(--font-outfit)] text-lg font-medium text-ink">
                    What happens next
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {expectations.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-steel"
                      >
                        <Check
                          weight="bold"
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-border pt-6">
                    <p className="text-sm font-medium text-ink">
                      Want context before you commit?
                    </p>
                    <ul className="mt-4 space-y-4">
                      {beforeYouAsk.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                          >
                            <span className="text-sm font-medium text-ink transition-colors group-hover:text-brand">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-sm leading-relaxed text-steel">
                              {item.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-steel">
                    <p className="font-medium text-ink">Prefer email?</p>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-brand hover:text-brand-dark"
                    >
                      {siteSettings.email}
                    </a>
                    <p className="mt-4 font-medium text-ink">Office</p>
                    <p>
                      {address.street}
                      <br />
                      {address.city}, {address.region} {address.postalCode}
                    </p>
                  </div>
                </div>
              </DoubleBezel>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
