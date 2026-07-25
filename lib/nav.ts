export type NavItem = {
  label: string;
  href: string;
};

/** After IA — buyer journey. Home is the logo mark. Consultation is the island CTA only. */
export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const footerNav: NavItem[] = [
  ...primaryNav,
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const cta = {
  primary: {
    label: "Book Strategy Consultation",
    href: "/book-consultation",
  },
  secondary: {
    label: "Explore Case Studies",
    href: "/case-studies",
  },
  supporting: {
    label: "See How We Work",
    href: "/process",
  },
} as const;

/** Legacy before-site service links — kept for redirects / content mapping in Phase D. */
export const serviceNav: NavItem[] = [
  { label: "Website Design", href: "/services/website-design" },
  { label: "Branding", href: "/services/branding" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Content Creation", href: "/services/content-creation" },
  { label: "Graphic Design", href: "/services/graphic-design" },
  { label: "UI / UX Design", href: "/services/ui-ux-design" },
];
