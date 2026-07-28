import { siteSettings } from "@/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Northline Creative to discuss your next website, branding, or marketing project.",
  path: "/contact",
});

export default function ContactPage() {
  const { address } = siteSettings;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Tell us about your business and goals. This simple form is our consultation request—no lengthy intake process."
        imageSrc="/images/pages/contact-hero.jpg"
        imageAlt="Client workshop at the Northline studio"
        priority
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Send a consultation request
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                Share a few details and we will follow up to discuss how we can
                help with websites, branding, marketing, and more.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="h-fit rounded-[var(--radius-card)] border border-border bg-surface-muted p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-ink">
                Contact details
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="block font-medium text-ink">Email</span>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-brand hover:text-brand-dark"
                  >
                    {siteSettings.email}
                  </a>
                </li>
                <li>
                  <span className="block font-medium text-ink">Phone</span>
                  <a
                    href={`tel:${siteSettings.phone.replace(/\D/g, "")}`}
                    className="text-brand hover:text-brand-dark"
                  >
                    {siteSettings.phone}
                  </a>
                </li>
                <li>
                  <span className="block font-medium text-ink">Office</span>
                  {address.street}
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
