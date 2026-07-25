export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const serviceNav: NavItem[] = [
  { label: "Website Design", href: "/services/website-design" },
  { label: "Branding", href: "/services/branding" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Content Creation", href: "/services/content-creation" },
  { label: "Graphic Design", href: "/services/graphic-design" },
  { label: "UI / UX Design", href: "/services/ui-ux-design" },
];
