import type { SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  companyName: "Northline Creative",
  tagline: "Creative Solutions for Modern Businesses",
  description:
    "Northline Creative is a full-service creative and digital agency helping businesses improve their online presence through websites, branding, marketing, design, and digital strategy.",
  email: "hello@northlinecreative.com",
  phone: "(555) 214-0890",
  address: {
    street: "420 Market Street, Suite 800",
    city: "San Francisco",
    region: "CA",
    postalCode: "94105",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "X", href: "https://x.com/" },
  ],
};
