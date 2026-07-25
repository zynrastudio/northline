"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSettings } from "@/content/site";
import { cta, primaryNav } from "@/lib/nav";
import { Button } from "@/components/shared/Button";
import { MobileNav } from "@/components/layout/MobileNav";

function navLinkClass(active: boolean) {
  return [
    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    active
      ? "bg-brand-subtle text-ink"
      : "text-steel hover:bg-ink/[0.04] hover:text-ink",
  ].join(" ");
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[50] flex justify-center px-3 pt-4 sm:px-4 sm:pt-5">
      <div className="pointer-events-auto flex w-full max-w-[1400px] items-center justify-center">
        <div
          className={[
            "flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-2 pl-3 sm:h-16 sm:px-3",
            "rounded-[var(--radius-island)] border border-ink/8 bg-surface-elevated/80",
            "shadow-[0_18px_50px_-28px_rgba(20,22,26,0.45)] backdrop-blur-xl",
            "supports-[backdrop-filter]:bg-surface-elevated/70",
          ].join(" ")}
        >
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full px-1.5 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <img
              src="/images/brand/logo-mark.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-[family-name:var(--font-outfit)] text-[0.95rem] font-medium tracking-tight text-ink sm:text-base">
              Northline
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 lg:flex"
          >
            {primaryNav.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(active)}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button href={cta.primary.href} size="sm" withArrow>
              {cta.primary.label}
            </Button>
          </div>

          <MobileNav companyName={siteSettings.companyName} />
        </div>
      </div>
    </header>
  );
}
