import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Reveal } from "@/components/shared/Reveal";
import { cta, primaryNav } from "@/lib/nav";

const destinations = [
  { label: "Home", href: "/", note: "Start from the beginning" },
  ...primaryNav
    .filter((item) =>
      ["/solutions", "/case-studies", "/process", "/insights"].includes(
        item.href,
      ),
    )
    .map((item) => ({
      label: item.label,
      href: item.href,
      note:
        item.href === "/solutions"
          ? "The four-pillar growth system"
          : item.href === "/case-studies"
            ? "Outcomes from recent engagements"
            : item.href === "/process"
              ? "How we work with clients"
              : "Frameworks and practical notes",
    })),
];

/**
 * Soft Structuralism 404 — one calm composition, recovery list, no card grid.
 */
export default function NotFound() {
  return (
    <section className="bg-surface pt-28 sm:pt-32">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">
              Error 404
            </p>
            <p
              aria-hidden
              className="mt-4 font-[family-name:var(--font-outfit)] text-[clamp(4.5rem,12vw,7.5rem)] font-medium leading-none tracking-tight text-brand/15"
            >
              404
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              This path leads nowhere.
            </h1>
            <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-steel sm:text-lg">
              The page you asked for is not on this site. Choose a clear route
              below, or book a consultation and we will map the next step with
              you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/" withArrow>
                Back to home
              </Button>
              <Button href={cta.primary.href} variant="secondary">
                {cta.primary.label}
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <DoubleBezel>
              <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
                <Image
                  src="/images/shared/not-found.jpg"
                  alt="Quiet architectural corridor opening toward soft daylight"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </DoubleBezel>
          </Reveal>
        </div>

        <Reveal className="mt-20 border-t border-border sm:mt-24" delay={0.12}>
          <p className="pt-10 text-xs font-medium tracking-[0.16em] text-steel uppercase">
            Useful destinations
          </p>
          <ul className="mt-2">
            {destinations.map((item) => (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  className="group grid gap-2 py-6 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6"
                >
                  <span className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink group-hover:text-brand sm:col-span-4 sm:text-xl">
                    {item.label}
                  </span>
                  <span className="text-sm leading-relaxed text-steel sm:col-span-7">
                    {item.note}
                  </span>
                  <span className="sm:col-span-1 sm:justify-self-end">
                    <ArrowRight
                      weight="bold"
                      className="h-4 w-4 text-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
