export type CompanyValue = {
  title: string;
  description: string;
};

export const aboutContent = {
  overview:
    "Northline Creative is a full-service creative and digital agency. We help businesses improve their online presence through websites, branding, marketing, design, and digital strategy. Growing primarily through referrals and repeat clients, we partner with teams who want a polished, professional presence online.",
  mission:
    "Our mission is to help modern businesses present themselves with clarity and creativity—so they can connect with customers, share their story, and grow with confidence.",
  values: [
    {
      title: "Quality",
      description:
        "We care about clean design, clear messaging, and work that holds up across every touchpoint.",
    },
    {
      title: "Partnership",
      description:
        "We listen closely, communicate openly, and treat every engagement as a collaboration.",
    },
    {
      title: "Creativity",
      description:
        "We bring fresh ideas to branding, websites, and campaigns while staying practical and on-brief.",
    },
    {
      title: "Reliability",
      description:
        "Deadlines, updates, and launches matter. We keep projects organized from kickoff to delivery.",
    },
  ] satisfies CompanyValue[],
  officeImages: [
    {
      src: "/images/office/studio.jpg",
      alt: "Our studio workspace with desks and large windows",
      caption: "Our studio workspace",
    },
    {
      src: "/images/office/collaboration.jpg",
      alt: "Team collaborating in a glass conference room",
      caption: "Collaboration in progress",
    },
    {
      src: "/images/office/workshop.jpg",
      alt: "Client workshop session around a long table",
      caption: "Client workshop session",
    },
  ],
};
