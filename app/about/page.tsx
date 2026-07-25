import { aboutContent, siteSettings, teamMembers } from "@/content";
import { CtaBand } from "@/components/shared/CtaBand";
import { ContentImage } from "@/components/shared/ContentImage";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { TeamMemberCard } from "@/components/shared/TeamMemberCard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Northline Creative—our mission, values, and the team behind our work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`Meet ${siteSettings.companyName}`}
        description="We are a professional, friendly creative agency helping businesses improve their online presence with modern design and digital strategy."
        imageSrc="/images/pages/about-hero.jpg"
        imageAlt="Northline Creative studio interior"
        priority
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              Company overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {aboutContent.overview}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Our clients include small businesses, startups, local companies,
              professional services, and ecommerce brands looking for creative
              support they can trust.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              Our mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {aboutContent.mission}
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-muted">
        <SectionHeading
          title="Our values"
          description="The principles that guide how we work with every client."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {aboutContent.values.map((value) => (
            <article
              key={value.title}
              className="rounded-[var(--radius-card)] border border-border bg-white p-6"
            >
              <h3 className="text-xl font-semibold text-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Meet the team"
          description="Designers, strategists, developers, and marketers working together for your brand."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Section>

      <Section className="bg-surface-muted">
        <SectionHeading
          title="Our office"
          description="A collaborative studio where branding, websites, and campaigns come together."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {aboutContent.officeImages.map((image) => (
            <figure key={image.src}>
              <ContentImage
                src={image.src}
                alt={image.alt}
                aspect="photo"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <figcaption className="mt-3 text-sm text-muted">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want to work with us?"
        description="Reach out to start a conversation about your website, brand, or next campaign."
      />
    </>
  );
}
