import type { GraphEdge } from "@/data/graph/types";

export const graphEdges: GraphEdge[] = [
  {
    id: "edge-identity-accessibility",
    source: "uday-vatti",
    target: "accessibility",
    reason: "Accessibility is treated as a foundational systems constraint across product and marketing surfaces.",
  },
  {
    id: "edge-identity-design-systems",
    source: "uday-vatti",
    target: "design-systems",
    reason: "Design systems are used to connect visual intent, implementation quality, and delivery speed.",
  },
  {
    id: "edge-identity-frontend",
    source: "uday-vatti",
    target: "frontend-architecture",
    reason: "Frontend architecture is the backbone that coordinates content, interactions, and scalability.",
  },
  {
    id: "edge-identity-ai",
    source: "uday-vatti",
    target: "ai-systems",
    reason: "AI is integrated into workflows to reduce repetitive operations and increase output quality.",
  },
  {
    id: "edge-accessibility-semantic",
    source: "accessibility",
    target: "semantic-html",
    reason: "Semantic markup improves accessibility, search relevance, and content portability.",
  },
  {
    id: "edge-accessibility-keyboard",
    source: "accessibility",
    target: "keyboard-navigation",
    reason: "Keyboard-first interaction design makes interface structure explicit and testable.",
  },
  {
    id: "edge-accessibility-interaction",
    source: "accessibility",
    target: "interaction-design",
    reason: "Interaction design and accessibility are co-dependent in robust UI systems.",
  },
  {
    id: "edge-design-frontend",
    source: "design-systems",
    target: "frontend-architecture",
    reason: "Token and component architecture shape how design systems scale in production.",
  },
  {
    id: "edge-design-devx",
    source: "design-systems",
    target: "developer-experience",
    reason: "Shared component standards reduce implementation drift and improve team velocity.",
  },
  {
    id: "edge-design-motion",
    source: "design-systems",
    target: "motion",
    reason: "Motion primitives become reusable when encoded as part of design system decisions.",
  },
  {
    id: "edge-frontend-performance",
    source: "frontend-architecture",
    target: "performance",
    reason: "Rendering and data-layer choices directly influence user-perceived speed.",
  },
  {
    id: "edge-frontend-content",
    source: "frontend-architecture",
    target: "content-systems",
    reason: "Content models and frontend boundaries must align for reliable publishing and delivery.",
  },
  {
    id: "edge-devx-ai",
    source: "developer-experience",
    target: "ai-systems",
    reason: "AI-assisted tooling strengthens developer workflows when integrated with guardrails.",
  },
  {
    id: "edge-ai-content",
    source: "ai-systems",
    target: "content-systems",
    reason: "AI can automate documentation and content operations when schemas are structured.",
  },
  {
    id: "edge-performance-motion",
    source: "performance",
    target: "motion",
    reason: "Motion quality must be balanced with runtime performance budgets.",
  },
  {
    id: "edge-content-photo",
    source: "content-systems",
    target: "photography",
    reason: "Photography informs narrative sequencing and editorial structure in content systems.",
  },
  {
    id: "edge-interaction-motion",
    source: "interaction-design",
    target: "motion",
    reason: "Motion is used to communicate interaction state changes and information hierarchy.",
  },
  {
    id: "edge-photo-identity",
    source: "photography",
    target: "uday-vatti",
    reason: "Photography practice sharpens observation and framing used in digital product decisions.",
  },
  {
    id: "edge-cars-identity",
    source: "cars",
    target: "uday-vatti",
    reason: "A passion for cars that shaped an appreciation for engineered feel, precision, and purposeful design.",
  },
  {
    id: "edge-cars-photo",
    source: "cars",
    target: "photography",
    reason: "Automotive subjects bring together composition, light, and mechanical detail.",
  },
];
