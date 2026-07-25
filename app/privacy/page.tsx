import type { Metadata } from "next";
import { siteSettings } from "@/content/site";
import { LegalDocument, type LegalSection } from "@/components/shared/LegalDocument";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Northline Creative collects, uses, and protects the information you share with us.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    heading: "Overview",
    body: [
      `This policy explains how ${siteSettings.companyName} collects, uses, and protects information when you visit our website or request a strategy consultation. We keep data collection to what we genuinely need to respond to you and improve the experience.`,
    ],
  },
  {
    heading: "Information we collect",
    body: ["We collect two kinds of information:"],
    bullets: [
      "Details you provide directly, such as your name, company, email, phone, and the goals or challenges you share in our consultation form.",
      "Technical and usage data collected automatically, such as pages viewed, referring source, approximate location, browser type, and device information.",
    ],
  },
  {
    heading: "How we use information",
    body: ["We use the information you provide to:"],
    bullets: [
      "Respond to consultation requests and assess whether we are a good fit.",
      "Prepare for and follow up on conversations about your goals.",
      "Understand how the site is used so we can improve content and performance.",
      "Meet legal, security, and record-keeping obligations.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "We use privacy-conscious analytics to understand aggregate site usage. These tools may set cookies or similar identifiers. You can control cookies through your browser settings, and blocking them will not prevent you from using the core parts of the site.",
    ],
  },
  {
    heading: "How we share information",
    body: [
      "We do not sell your personal information. We share it only in limited circumstances:",
    ],
    bullets: [
      "With trusted service providers who help us operate the site and communicate with you, under confidentiality obligations.",
      "When required by law, regulation, or valid legal process.",
      "To protect the rights, safety, and property of Northline Creative, our clients, or others.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep the information you submit for as long as needed to respond to your request and maintain a reasonable business record. When it is no longer needed, we delete or anonymize it.",
    ],
  },
  {
    heading: "Your choices and rights",
    body: [
      "You can request access to, correction of, or deletion of the personal information we hold about you. You can also ask us to stop contacting you at any time. To make a request, email us using the address below and we will respond within a reasonable timeframe.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use reasonable administrative and technical safeguards to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we work to protect your data in line with industry practice.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as our practices or legal obligations change. When we do, we will revise the date shown above. Significant changes will be highlighted on this page.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `Questions about this policy or your data can be sent to ${siteSettings.email}. You can also reach us at ${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.region} ${siteSettings.address.postalCode}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      description="We collect only what we need to help you, and we handle it with care. Here is exactly how."
      updated="July 2026"
      sections={sections}
    />
  );
}
