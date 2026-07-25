import Link from "next/link";
import { siteSettings } from "@/content/site";
import { primaryNav, serviceNav } from "@/lib/nav";
import { Container } from "@/components/shared/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = siteSettings;

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-ink">
              {siteSettings.companyName}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {siteSettings.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Explore</p>
            <ul className="mt-3 space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Services</p>
            <ul className="mt-3 space-y-2">
              {serviceNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="hover:text-brand"
                >
                  {siteSettings.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteSettings.phone.replace(/\D/g, "")}`}
                  className="hover:text-brand"
                >
                  {siteSettings.phone}
                </a>
              </li>
              <li>
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </li>
            </ul>
            <ul className="mt-4 flex flex-wrap gap-3">
              {siteSettings.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-brand hover:text-brand-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted">
          © {year} {siteSettings.companyName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
