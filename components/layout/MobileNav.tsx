"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cta, primaryNav } from "@/lib/nav";
import { Button } from "@/components/shared/Button";

type MobileNavProps = {
  companyName: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ companyName }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const getFocusable = () =>
      panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
        : [];

    requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const nodes = getFocusable();
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      menuButtonRef.current?.focus();
    };
  }, [open]);

  const panel =
    open && mounted
      ? createPortal(
          <div
            ref={panelRef}
            id={panelId}
            className="fixed inset-0 z-[80] flex h-[100dvh] w-[100vw] max-w-[100vw] flex-col bg-surface"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
              <p className="font-[family-name:var(--font-outfit)] text-sm font-medium tracking-wide text-steel">
                {companyName}
              </p>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-surface text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <span
                  aria-hidden
                  className="relative flex h-4 w-5 items-center justify-center"
                >
                  <span className="absolute block h-0.5 w-5 rotate-45 bg-current" />
                  <span className="absolute block h-0.5 w-5 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
            >
              {primaryNav.map((item, index) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "rounded-[var(--radius-panel)] px-3 py-3 font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-ink",
                      "opacity-0 animate-[navIn_0.55s_cubic-bezier(0.32,0.72,0,1)_forwards]",
                      active ? "text-brand" : "",
                    ].join(" ")}
                    style={{ animationDelay: `${100 + index * 50}ms` }}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div
                className="mt-6 opacity-0 animate-[navIn_0.55s_cubic-bezier(0.32,0.72,0,1)_forwards]"
                style={{
                  animationDelay: `${100 + primaryNav.length * 50}ms`,
                }}
              >
                <Button
                  href={cta.primary.href}
                  className="w-full max-w-sm"
                  withArrow
                  onClick={() => setOpen(false)}
                >
                  {cta.primary.label}
                </Button>
              </div>
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="lg:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span
          aria-hidden
          className="relative flex h-4 w-5 items-center justify-center"
        >
          <span
            className={`absolute block h-0.5 w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute block h-0.5 w-5 bg-current transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute block h-0.5 w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </span>
      </button>
      {panel}
    </div>
  );
}
