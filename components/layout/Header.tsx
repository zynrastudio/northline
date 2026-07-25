import Link from "next/link";
import { siteSettings } from "@/content/site";
import { primaryNav } from "@/lib/nav";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {/* SVG mark — decorative; company name provides accessible label */}
          <img
            src="/images/brand/logo-mark.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold tracking-tight text-ink">
            {siteSettings.companyName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" size="sm">
            Contact Us
          </Button>
        </div>

        <MobileNav companyName={siteSettings.companyName} />
      </Container>
    </header>
  );
}
