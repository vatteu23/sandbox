import type { GraphPath } from "@/data/graph/types";

export const graphPaths: GraphPath[] = [
  {
    id: "path-accessibility-to-design-systems",
    title: "Accessible defaults → scalable systems",
    whyItMatters:
      "Semantic-first components carry accessibility forward at scale.",
    startNodeId: "accessibility",
    endNodeId: "design-systems",
    steps: [
      { nodeId: "accessibility", label: "Accessibility", reason: "" },
      { nodeId: "semantic-html", label: "Semantic HTML", reason: "" },
      { nodeId: "design-systems", label: "Design Systems", reason: "" },
    ],
    evidence: [
      {
        projectId: "labelbox",
        title: "Labelbox",
        href: "/work/labelbox",
        summary: "Token-based component library across teams",
      },
    ],
  },
  {
    id: "path-design-systems-to-performance",
    title: "System constraints → runtime quality",
    whyItMatters:
      "When the system constrains what ships, the frontend stays lean.",
    startNodeId: "design-systems",
    endNodeId: "performance",
    steps: [
      { nodeId: "design-systems", label: "Design Systems", reason: "" },
      { nodeId: "frontend-architecture", label: "Architecture", reason: "" },
      { nodeId: "performance", label: "Performance", reason: "" },
    ],
    evidence: [
      {
        projectId: "tcp",
        title: "Triple Crown Products",
        href: "/work/tcp",
        summary: "40% faster loads from system-level refactors",
      },
      {
        projectId: "them-design-studios",
        title: "Them Design Studios",
        href: "/work/them-design-studios",
        summary: "95+ Lighthouse with reusable patterns",
      },
    ],
  },
  {
    id: "path-frontend-to-ai-systems",
    title: "Clear boundaries → useful automation",
    whyItMatters:
      "AI helps most at repetitive operational bottlenecks, not as a feature.",
    startNodeId: "frontend-architecture",
    endNodeId: "ai-systems",
    steps: [
      { nodeId: "frontend-architecture", label: "Architecture", reason: "" },
      { nodeId: "developer-experience", label: "Dev Experience", reason: "" },
      { nodeId: "ai-systems", label: "AI Systems", reason: "" },
    ],
    evidence: [
      {
        projectId: "labelbox",
        title: "Labelbox",
        href: "/work/labelbox",
        summary: "AI agent for auto-updating internal docs",
      },
    ],
  },
  {
    id: "path-content-to-interaction",
    title: "Content structure → interaction quality",
    whyItMatters:
      "Wrong content model means the interaction layer fights it forever.",
    startNodeId: "content-systems",
    endNodeId: "interaction-design",
    steps: [
      { nodeId: "content-systems", label: "Content", reason: "" },
      { nodeId: "frontend-architecture", label: "Architecture", reason: "" },
      { nodeId: "interaction-design", label: "Interaction", reason: "" },
    ],
    evidence: [
      {
        projectId: "earthbound-adventures",
        title: "Earthbound Adventures",
        href: "/work/earthbound-adventures",
        summary: "Booking flow driven by content alignment",
      },
    ],
  },
  {
    id: "path-motion-to-accessibility",
    title: "Motion that explains → without excluding",
    whyItMatters:
      "Every transition has to stay predictable for all users.",
    startNodeId: "motion",
    endNodeId: "accessibility",
    steps: [
      { nodeId: "motion", label: "Motion", reason: "" },
      { nodeId: "interaction-design", label: "Interaction", reason: "" },
      { nodeId: "accessibility", label: "Accessibility", reason: "" },
    ],
    evidence: [
      {
        projectId: "them-design-studios",
        title: "Them Design Studios",
        href: "/work/them-design-studios",
        summary: "GSAP system supporting narrative without disruption",
      },
    ],
  },
  {
    id: "path-performance-to-content",
    title: "Fast pages → content discipline",
    whyItMatters:
      "Payload shape, caching, and hydration all start with content structure.",
    startNodeId: "performance",
    endNodeId: "content-systems",
    steps: [
      { nodeId: "performance", label: "Performance", reason: "" },
      { nodeId: "frontend-architecture", label: "Architecture", reason: "" },
      { nodeId: "content-systems", label: "Content", reason: "" },
    ],
    evidence: [
      {
        projectId: "labelbox",
        title: "Labelbox",
        href: "/work/labelbox",
        summary: "CMS + frontend tuned for speed at scale",
      },
      {
        projectId: "tcp",
        title: "Triple Crown Products",
        href: "/work/tcp",
        summary: "60% organic traffic growth via content strategy",
      },
    ],
  },
];
