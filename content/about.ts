export type CompanyValue = {
  title: string;
  description: string;
};

export const aboutContent = {
  overview:
    "Northline Creative is a strategic growth partner for B2B companies. We work at the intersection of positioning, digital experience, and automation, so the website stops being a brochure and starts producing qualified conversations. Most of our work comes from referrals and repeat engagements, which is how we prefer to grow.",
  mission:
    "Our mission is to help B2B companies acquire better customers. Not more traffic, not more impressions. Better customers, reached through clearer direction and digital work that can be measured.",
  positioningStatement:
    "We are not a vendor executing a deck. We are the partner accountable for whether the work produces pipeline.",
  values: [
    {
      title: "Outcomes over output",
      description:
        "A deliverable that does not change a number is a cost. We agree on the metric before we agree on the scope.",
    },
    {
      title: "Clarity as a discipline",
      description:
        "Most digital problems are decision problems. We do the harder work of narrowing focus before designing anything.",
    },
    {
      title: "Partnership, not handoff",
      description:
        "We stay past launch. Strategy, build, and iteration belong to the same team, or the thread gets dropped.",
    },
    {
      title: "Evidence over opinion",
      description:
        "Research, analytics, and experiments settle debates that would otherwise be settled by whoever is loudest.",
    },
  ] satisfies CompanyValue[],
  officeImages: [
    {
      src: "/images/office/studio.jpg",
      alt: "Studio workspace with desks and large windows",
      caption: "Where the strategy work happens",
    },
    {
      src: "/images/office/collaboration.jpg",
      alt: "Team collaborating in a glass conference room",
      caption: "Working sessions, not status calls",
    },
    {
      src: "/images/office/workshop.jpg",
      alt: "Client workshop session around a long table",
      caption: "Diagnosis starts with your team",
    },
  ],
};
