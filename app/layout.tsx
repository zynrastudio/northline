import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import { ScrollbarController } from "@/components/shared/ScrollbarController";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

/** Stand-ins for Neue Montreal (display) + Satoshi (body) until licensed files are self-hosted. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GrainOverlay />
        <ScrollbarController />
        <GoogleAnalytics />
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
