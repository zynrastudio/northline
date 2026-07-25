import Link from "next/link";
import { siteSettings } from "@/content/site";
import { cta, footerNav, legalNav } from "@/lib/nav";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-20 sm:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <img
                src="/images/brand/logo-mark.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight text-ink">
                Northline
              </span>
            </Link>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-steel">
              {siteSettings.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-steel transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="lg:shrink-0">
            <Button href={cta.primary.href} withArrow>
              {cta.primary.label}
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-steel">
            © {year} {siteSettings.companyName}
          </p>
          <ul className="flex flex-wrap gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-steel transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
