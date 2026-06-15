export type ConceptNarrative = {
  concept: string;
  problem: string;
  approach: string;
  outcome: string;
  supportingWork: string;
};

export const projectConceptNarratives: Record<string, ConceptNarrative> = {
  labelbox: {
    concept: "Design Systems + Frontend Architecture",
    problem: "Marketing and product surfaces needed consistency without slowing experimentation.",
    approach: "Built token-based systems, scalable CMS models, and reusable interaction patterns.",
    outcome: "Faster publishing cycles with stable quality, performance, and stronger team alignment.",
    supportingWork: "labelbox.com, prism.labelbox.com, alignerr.com",
  },
  tcp: {
    concept: "Performance + Content Systems",
    problem: "Legacy e-commerce architecture limited speed and organic growth.",
    approach: "Rebuilt UI systems with modern frontend patterns and content workflows.",
    outcome: "Improved conversion, faster performance, and measurable SEO growth.",
    supportingWork: "Triple Crown Products webstores and internal CMS tooling",
  },
  cgs: {
    concept: "Accessibility + Data Interaction",
    problem: "Complex educational datasets were difficult for stakeholders to navigate.",
    approach: "Designed interactive data experiences with clearer filters and visual hierarchy.",
    outcome: "Research workflows became easier to interpret and act on.",
    supportingWork: "60by25 graduation dashboards and analysis tools",
  },
  "them-design-studios": {
    concept: "Motion + Brand Systems",
    problem: "Agency storytelling lacked a scalable digital system for updates and campaigns.",
    approach: "Shipped a responsive site with reusable components and motion patterns.",
    outcome: "Higher inquiry volume with stronger editorial consistency.",
    supportingWork: "themdesignstudios.com",
  },
  "earthbound-adventures": {
    concept: "Interaction Design + Conversion Systems",
    problem: "Booking flows were fragmented and difficult for international travelers.",
    approach: "Built a structured booking journey with clearer pricing and itinerary paths.",
    outcome: "Significant improvement in booking completion and mobile usability.",
    supportingWork: "Inca Trail booking and itinerary experience",
  },
};
