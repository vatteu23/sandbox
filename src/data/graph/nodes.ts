import { Freelance, Porjects } from "@/data/projects";
import type { GraphNode, GraphNodeEvidence } from "@/data/graph/types";

const allProjects = [...Porjects, ...Freelance];

const byId = (projectId: string): GraphNodeEvidence[] => {
  const project = allProjects.find((entry) => entry.id === projectId);
  if (!project) {
    return [];
  }

  return [
    {
      projectId: project.id,
      title: project.name,
      detail: project.metric || project.role || "Supporting work",
      href: `/work/${project.id}`,
    },
  ];
};

export const graphNodes: GraphNode[] = [
  {
    id: "uday-vatti",
    title: "Uday Vatti",
    category: "identity",
    summary: "I sit between design and engineering — not in the middle, but across both. I think in systems, ship in code, and care about how things connect end-to-end.",
    philosophy:
      "I want the intent behind a design to survive all the way to production. That means I have to own both sides.",
    relatedNodes: ["accessibility", "design-systems", "frontend-architecture", "ai-systems", "photography", "cars"],
    examples: [...byId("labelbox")],
    experiments: [
      {
        title: "Cross-team dependency maps",
        detail: "Before I start building, I map what touches what. It saves weeks of rework later.",
      },
    ],
    position: { x: 0, y: 0 },
  },
  {
    id: "accessibility",
    title: "Accessibility",
    category: "domain",
    summary: "I don't bolt accessibility on at the end. I build with semantic structure and keyboard models from the start — it's how I make sure the foundation is actually solid.",
    philosophy:
      "If the semantics are right and the interaction model is sound, everything else gets easier. Accessibility isn't extra work, it's better architecture.",
    relatedNodes: ["semantic-html", "keyboard-navigation", "interaction-design", "design-systems"],
    examples: [...byId("labelbox"), ...byId("cgs")],
    experiments: [
      {
        title: "Focus-order-first reviews",
        detail: "I run keyboard and focus audits before visual polish. Catches structural problems early instead of patching later.",
      },
    ],
    position: { x: -320, y: -180 },
  },
  {
    id: "semantic-html",
    title: "Semantic HTML",
    category: "practice",
    summary: "I write markup that means something — not just divs with classes. It makes the interface legible for users, crawlers, and screen readers without extra effort.",
    philosophy: "The less custom logic I need to write, the more resilient the interface. Good semantics get me there.",
    relatedNodes: ["accessibility", "content-systems", "frontend-architecture"],
    examples: [...byId("labelbox")],
    experiments: [],
    position: { x: -560, y: -240 },
  },
  {
    id: "keyboard-navigation",
    title: "Keyboard Navigation",
    category: "practice",
    summary: "If I can't tab through a workflow smoothly, the interaction model is wrong. I design for keyboard first because it forces the structure to be explicit.",
    philosophy: "When keyboard users move efficiently, it means the interaction hierarchy is actually working. Everyone benefits.",
    relatedNodes: ["accessibility", "interaction-design"],
    examples: [...byId("labelbox")],
    experiments: [],
    position: { x: -520, y: -40 },
  },
  {
    id: "design-systems",
    title: "Design Systems",
    category: "domain",
    summary: "I build systems that encode decisions, not just styles. Tokens, components, patterns — all structured so teams ship faster without drifting apart.",
    philosophy:
      "A good design system makes the right thing the easy thing. I want teams to move fast and still end up consistent.",
    relatedNodes: ["frontend-architecture", "developer-experience", "motion"],
    examples: [...byId("labelbox"), ...byId("them-design-studios")],
    experiments: [
      {
        title: "Token consolidation",
        detail: "I've been migrating scattered one-off styles into tokenized primitives. Less decisions per component, more consistency across surfaces.",
      },
    ],
    position: { x: -100, y: -300 },
  },
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    category: "domain",
    summary: "I care about how code is organized for the long term — component boundaries, data flow, rendering strategy. The goal is a codebase that can change without breaking.",
    philosophy: "I draw clear lines between content, UI state, and platform constraints. That's how I keep things maintainable as scope grows.",
    relatedNodes: ["performance", "content-systems", "developer-experience", "design-systems"],
    examples: [...byId("labelbox"), ...byId("tcp")],
    experiments: [],
    position: { x: 260, y: -240 },
  },
  {
    id: "developer-experience",
    title: "Developer Experience",
    category: "domain",
    summary: "I think a lot about how other engineers interact with what I build. Tooling, docs, defaults — if these are good, the whole team ships better work.",
    philosophy: "DX is leverage. Better defaults and clearer documentation reduce the coordination tax that slows teams down.",
    relatedNodes: ["design-systems", "ai-systems", "frontend-architecture"],
    examples: [...byId("labelbox")],
    experiments: [
      {
        title: "Storybook as alignment tool",
        detail: "I use component documentation to get teams on the same page before implementation diverges. Cheaper than fixing it after.",
      },
    ],
    position: { x: 580, y: -110 },
  },
  {
    id: "ai-systems",
    title: "AI Systems",
    category: "domain",
    summary: "I don't ship AI as a feature. I find the repetitive bottlenecks — docs drifting, scaffolding, triage — and put automation there. That's where it actually helps.",
    philosophy: "AI is operational infrastructure for me. Less about magic, more about removing the boring work that degrades quality over time.",
    relatedNodes: ["developer-experience", "content-systems", "frontend-architecture"],
    examples: [...byId("labelbox")],
    experiments: [
      {
        title: "Auto-updating docs agent",
        detail: "Built an agent that regenerates internal documentation on every PR merge. No more stale wikis.",
      },
    ],
    position: { x: 620, y: 170 },
  },
  {
    id: "performance",
    title: "Performance",
    category: "domain",
    summary: "Fast interfaces aren't a nice-to-have for me — they're how users trust the product. I care about perceived speed, real latency, and interactions that feel instant.",
    philosophy: "Speed supports trust. Especially in data-heavy workflows, a slow interface erodes confidence in the tool itself.",
    relatedNodes: ["frontend-architecture", "motion", "content-systems"],
    examples: [...byId("labelbox"), ...byId("tcp"), ...byId("them-design-studios")],
    experiments: [],
    position: { x: 300, y: 80 },
  },
  {
    id: "content-systems",
    title: "Content Systems",
    category: "domain",
    summary: "I design content models and publishing workflows that hold up as teams and channels multiply. The structure has to outlast any single redesign.",
    philosophy:
      "I want messaging, metadata, and presentation to stay connected over time — not just work for the first launch.",
    relatedNodes: ["frontend-architecture", "ai-systems", "photography"],
    examples: [...byId("labelbox"), ...byId("tcp"), ...byId("them-design-studios")],
    experiments: [],
    position: { x: 80, y: 300 },
  },
  {
    id: "interaction-design",
    title: "Interaction Design",
    category: "domain",
    summary: "I design interactions to communicate where you are, what just happened, and what to do next. Patterns should reduce cognitive load, not add to it.",
    philosophy: "Motion and interaction should explain the system to the user, not decorate it.",
    relatedNodes: ["motion", "accessibility", "frontend-architecture"],
    examples: [...byId("labelbox"), ...byId("earthbound-adventures")],
    experiments: [],
    position: { x: -200, y: 250 },
  },
  {
    id: "motion",
    title: "Motion",
    category: "domain",
    summary: "I use motion to show where information came from and where it's going. It should teach the interface, not perform for the user.",
    philosophy: "If a transition doesn't help the user understand what changed, it shouldn't be there.",
    relatedNodes: ["interaction-design", "design-systems", "performance"],
    examples: [...byId("labelbox"), ...byId("them-design-studios")],
    experiments: [
      {
        title: "Context-preserving transitions",
        detail: "I've been favoring transitions that show spatial relationships between states — less fade-in/out, more movement that maps to where things actually live.",
      },
    ],
    position: { x: -480, y: 120 },
  },
  {
    id: "photography",
    title: "Photography",
    category: "domain",
    summary: "Photography is how I practice seeing. Composition, light, timing — it trains the same instincts I use when framing interfaces and content.",
    philosophy:
      "The discipline of noticing what matters in a frame carries over directly into product design. Both are about what to include and what to leave out.",
    relatedNodes: ["content-systems", "interaction-design", "uday-vatti"],
    examples: [],
    experiments: [
      {
        title: "Visual storytelling → product flows",
        detail: "I've been studying how editorial photo sequences create pacing and applying that rhythm to multi-step interfaces.",
      },
    ],
    position: { x: -10, y: 470 },
  },
  {
    id: "cars",
    title: "Cars",
    category: "domain",
    summary: "Cars have been a thing for me since I was a kid. I'm drawn to machines where the engineering is felt, not explained — analog steering, mechanical grip, driver connection.",
    philosophy:
      "The best engineering disappears into the experience. You don't think about it, you just feel it working. That's what I chase in interfaces too.",
    relatedNodes: ["uday-vatti", "photography"],
    examples: [],
    experiments: [
      {
        title: "Lexus LFA",
        detail: "The V10 that revs to 9,000 rpm and sounds like nothing else. Engineering as art.",
      },
      {
        title: "BMW 1M",
        detail: "Short wheelbase, hydraulic steering, perfect weight. The last truly analog M car.",
      },
      {
        title: "Porsche 911 Targa",
        detail: "Open-top 911 with the roll bar. Timeless shape, mechanical feel, no compromise on character.",
      },
      {
        title: "Mitsubishi Evo 9",
        detail: "Rally DNA for the street. Raw, mechanical, unfiltered. My childhood poster car.",
      },
    ],
    position: { x: 280, y: 420 },
  },
];

export const graphNodeMap = Object.fromEntries(
  graphNodes.map((node) => [node.id, node]),
) as Record<string, GraphNode>;
