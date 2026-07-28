import { Check } from "@phosphor-icons/react/dist/ssr";
import { BookingCompleteBeacon } from "@/components/analytics/BookingCompleteBeacon";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { PageHero } from "@/components/shared/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Consultation Booked",
  description:
    "Your Northline strategy consultation is confirmed. We look forward to the conversation.",
  path: "/book-consultation/booked",
});

export default function ConsultationBookedPage() {
  return (
    <>
      <BookingCompleteBeacon />
      <PageHero
        eyebrow="Booked"
        title="You’re on the calendar."
        description="Thanks for booking a strategy consultation. We’ll show up prepared. Bring one priority outcome for the next two quarters."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <DoubleBezel tone="elevated">
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-on-brand shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                <Check weight="bold" className="h-6 w-6" />
              </span>

              <h2 className="mt-6 font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                What to expect
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "A focused conversation on goals and fit, not a generic pitch",
                  "A clear view of how we would approach the work if we proceed",
                  "A calendar invite from Cal.com with join details",
                ].map((item) => (
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

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/process" withArrow>
                  See how we work
                </Button>
                <Button href="/" variant="secondary">
                  Back home
                </Button>
              </div>
            </div>
          </DoubleBezel>
        </Container>
      </section>
    </>
  );
}
