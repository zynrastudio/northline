import type { Metadata } from "next";
import { siteSettings } from "@/content/site";
import { LegalDocument, type LegalSection } from "@/components/shared/LegalDocument";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms that govern your use of the Northline Creative website and its content.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    body: [
      `These terms govern your use of the ${siteSettings.companyName} website. By accessing or using the site, you agree to these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    heading: "Use of the site",
    body: [
      "You may use the site for lawful purposes and to learn about our work and services. You agree not to misuse the site, interfere with its operation, attempt to access it in unauthorized ways, or use it to infringe the rights of others.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The content on this site, including text, design, graphics, logos, and case study material, is owned by Northline Creative or its clients and licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from it without prior written permission.",
    ],
  },
  {
    heading: "Consultations and proposals",
    body: [
      "Information on this site is provided for general purposes and does not constitute a binding offer. Any engagement between you and Northline Creative is governed by a separate written agreement that defines scope, fees, timelines, and deliverables. Submitting a consultation request does not create a client relationship.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "The site may link to third-party websites or resources. We provide these links for convenience and do not endorse or take responsibility for the content, products, or practices of those third parties.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      'The site and its content are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.',
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Northline Creative will not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the site.",
    ],
  },
  {
    heading: "Indemnification",
    body: [
      "You agree to indemnify and hold Northline Creative harmless from any claims, losses, or expenses arising out of your misuse of the site or violation of these terms.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the State of California, without regard to its conflict of law rules. Any dispute will be handled in the courts located in that jurisdiction.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. Continued use of the site after changes take effect means you accept the revised terms. The date above reflects the most recent update.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `Questions about these terms can be sent to ${siteSettings.email}, or by mail to ${siteSettings.address.street}, ${siteSettings.address.city}, ${siteSettings.address.region} ${siteSettings.address.postalCode}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of Use"
      description="The ground rules for using this site. Clear, standard, and written in plain language."
      updated="July 2026"
      sections={sections}
    />
  );
}
