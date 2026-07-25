import Image from "next/image";
import Link from "next/link";
import {
  Browser,
  ChartLineUp,
  Compass,
  GearSix,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { homeContent, homePillars } from "@/content/home";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";

const icons = {
  strategy: Compass,
  "digital-experiences": Browser,
  "business-automation": GearSix,
  "growth-enablement": ChartLineUp,
} as const;

type PillarIconSlug = keyof typeof icons;

const linkLabels: Record<string, string> = {
  strategy: "Explore Strategy",
  "digital-experiences": "Explore Digital Experiences",
  "business-automation": "Explore Automation",
  "growth-enablement": "Explore Growth",
};

export function HomePillars() {
  const [strategy, digital, automation, growth] = homePillars;
  const { headline, featuredImage, featuredImageAlt } = homeContent.pillars;

  return (
    <section className="bg-surface pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <h2 className="max-w-[18ch] font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
          <Reveal className="lg:col-span-5 lg:row-span-2">
            <PillarFeature
              slug={strategy.slug as PillarIconSlug}
              title={strategy.title}
              body={strategy.body}
              href={strategy.href}
              image={featuredImage}
              imageAlt={featuredImageAlt}
            />
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <PillarPanel
              slug={digital.slug as PillarIconSlug}
              title={digital.title}
              body={digital.body}
              href={digital.href}
            />
          </Reveal>

          <Reveal className="lg:col-span-4" delay={0.1}>
            <PillarPanel
              slug={automation.slug as PillarIconSlug}
              title={automation.title}
              body={automation.body}
              href={automation.href}
            />
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.14}>
            <PillarPanel
              slug={growth.slug as PillarIconSlug}
              title={growth.title}
              body={growth.body}
              href={growth.href}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PillarFeature({
  slug,
  title,
  body,
  href,
  image,
  imageAlt,
}: {
  slug: keyof typeof icons;
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
}) {
  const Icon = icons[slug];

  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[28rem] flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-brand/45 to-brand/20"
      />
      <div className="relative z-10 p-7 sm:p-8">
        <Icon weight="regular" className="h-7 w-7 text-white" />
        <h3 className="mt-5 font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-white/80 sm:text-base">
          {body}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-subtle">
          {linkLabels[slug]}
          <ArrowRight
            weight="bold"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

function PillarPanel({
  slug,
  title,
  body,
  href,
}: {
  slug: keyof typeof icons;
  title: string;
  body: string;
  href: string;
}) {
  const Icon = icons[slug];

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[var(--radius-panel)] border border-border bg-surface-elevated p-7 transition-colors duration-300 hover:border-brand/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-8"
    >
      <Icon weight="regular" className="h-7 w-7 text-brand" />
      <h3 className="mt-5 font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight text-ink sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-steel sm:text-base">
        {body}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand">
        {linkLabels[slug]}
        <ArrowRight
          weight="bold"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
