import type { Metadata } from "next";
import { siteSettings } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northlinecreative.com";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description = siteSettings.description,
  path = "/",
  image = "/images/og-default.jpg",
}: BuildMetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteSettings.companyName}`
    : `${siteSettings.companyName} | ${siteSettings.tagline}`;

  const url = new URL(path, siteUrl).toString();

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteSettings.companyName,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}
