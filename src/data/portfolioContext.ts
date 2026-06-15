/**
 * Portfolio context data for the AI assistant
 * Reflects the current resume and site content.
 */
export const portfolioContext = {
  personalInfo: {
    name: "Uday Vatti",
    title: "Sr. Design Engineer",
    company: "Labelbox",
    location: "San Francisco, CA",
    email: "vuday23@gmail.com",
    linkedin: "https://www.linkedin.com/in/vattiu/",
    website: "https://udayvatti.com",
    yearsOfExperience: "9+",
  },
  websitePages: {
    home: { url: "/", description: "Home page with editorial project roster" },
    about: { url: "/about", description: "About page with bio, design craft, and selected work" },
    work: { url: "/work", description: "Work index with all projects and skills marquee" },
    photography: { url: "/photography", description: "Uday's photography portfolio — cars, cities, light" },
    labelbox: { url: "/work/labelbox", description: "Case study: Labelbox — Sr. Design Engineer, Nov 2021–Present" },
    tcp: { url: "/work/tcp", description: "Case study: Triple Crown Products — Full Stack Developer, 2017–2021" },
    cgs: { url: "/work/cgs", description: "Case study: Center for Governmental Studies — Web Developer, 2016–2017" },
    themDesignStudios: { url: "/work/them-design-studios", description: "Freelance: Them Design Studios — 200% more inquiries, 95+ Lighthouse" },
    earthbound: { url: "/work/earthbound-adventures", description: "Freelance: Earthbound Adventures — 85% booking conversion increase" },
    resume: { url: "/resume.pdf", description: "Uday's resume in PDF format" },
  },
  summary:
    "Sr. Design Engineer with 9+ years of experience at the intersection of product design and frontend engineering. I build the full arc — from Figma component libraries and motion systems to production-grade Next.js platforms backed by GCP infrastructure. At Labelbox, I exercise cross-functional technical ownership over multiple full-stack systems end-to-end: interactive marketing pages, authentication infrastructure, internal tooling, and data pipelines. I believe great products are built where design and engineering share the same vocabulary.",
  coreCompetencies: {
    designCraft: [
      "Figma — advanced component architecture (variants, auto-layout, variables)",
      "High-fidelity prototypes and design token libraries",
      "UI/UX systems and interaction design",
      "Editorial layout, typographic hierarchy, visual direction",
    ],
    motionAndInteraction: [
      "GSAP timelines, ScrollTrigger, entrance/exit animations",
      "Framer Motion layouts and physics-based spring animations",
      "Scroll-triggered reveals, hero sequences, micro-interactions",
    ],
    designSystems: [
      "Storybook component documentation",
      "Figma-to-code pipelines with token-based theming",
      "Light/dark mode design systems",
      "Component library authoring and handoff",
    ],
    platformEngineering: [
      "Frontend architecture, Core Web Vitals, and technical SEO",
      "Next.js, React, TypeScript, Node.js",
      "REST & RPC APIs",
      "GCS, BigQuery, Cloud Run, Vercel, Supabase, Postgres",
      "Auth systems — RBAC, JWT, OAuth, private npm SDK authoring",
      "ETL pipelines, cron-based processors, BigQuery data modeling",
      "CMS architecture, content modeling, and publishing workflows",
      "CI/CD, GitHub Actions, Headless CMS (Sanity, Contentful)",
      "Localization infrastructure",
    ],
  },
  experience: [
    {
      company: "Labelbox",
      role: "Sr. Design Engineer",
      period: "Nov 2021 – Present",
      location: "San Francisco, CA",
      description:
        "Exercise cross-functional technical ownership over the full design-to-production workflow across labelbox.com and alignerr.com — from Figma component libraries and interaction specs through Next.js frontend architecture, CMS authoring schemas, and deployment. Also built internal tooling including Evaluation Studio, authentication infrastructure, and data pipelines.",
      highlights: [
        "Design-to-Code Leadership: Own the full Figma-to-production workflow across multiple sites and products, architecting robust design system code",
        "Frontend Architecture & SEO: Optimized Core Web Vitals and established technical SEO strategy for labelbox.com",
        "CMS Architecture: Designed scalable CMS architecture with robust content modeling and automated publishing workflows for alignerr.com",
        "Motion & Interaction Design: GSAP and Framer Motion animation systems including scroll-triggered reveals and hero sequences across interactive marketing pages",
        "Platform Engineering: Architected and launched multiple production platforms from scratch — model evaluation, auth, security tooling, data management",
        "Auth & Security: Built centralized auth gateway published as a private npm SDK, eliminating redundant auth across internal products",
        "Data Visualization: Built complex data visualization systems for model performance in Evaluation Studio with rubric scoring, QA, real-time analysis",
        "Cloud Infrastructure: Engineered GCS auto-scan service and localization infrastructure for automated data discovery and global content delivery",
      ],
      technologies: [
        "React", "TypeScript", "Next.js", "Tailwind CSS", "Sanity CMS",
        "GSAP", "Framer Motion", "Figma", "Storybook", "GCP", "BigQuery",
        "Google Tag Manager", "GraphQL",
      ],
      metric: "Full ownership · concept to launch · 4+ yrs",
    },
    {
      company: "Triple Crown Products",
      role: "Full Stack Developer & Designer",
      period: "July 2017 – Oct 2021",
      description:
        "Led frontend architecture and UI design for e-commerce platforms. Modernized legacy systems with React, focused on Core Web Vitals, technical SEO, and internal tooling empowering the marketing team.",
      highlights: [
        "40% website performance improvement through caching and asset optimization",
        "60% increase in organic traffic from SEO enhancements",
        "Built custom CMS with automated publishing workflows for scheduled content releases and feature flag deployments",
        "Custom webstore UIs with reusable component framework for different brands",
        "Sales dashboard with real-time analytics and reporting",
      ],
      technologies: ["C#", ".NET", ".NET Core", "SQL", "React", "Tailwind CSS"],
      metric: "40% faster · 60% more organic traffic",
    },
    {
      company: "Center for Governmental Studies (NIU)",
      role: "Web Developer",
      period: "June 2016 – May 2017",
      description:
        "Core developer for interactive data visualization systems. Collaborated with researchers and policymakers to make complex educational metrics explorable and accessible.",
      highlights: [
        "Interactive visualization tools using D3.js and C# MVC",
        "Platform visualizing graduation rates for the 60by25 initiative",
        "Used by education stakeholders and government agencies",
      ],
      technologies: ["D3.js", "C#", "SQL", "MVC", "JavaScript", "Bootstrap"],
    },
  ],
  freelanceProjects: [
    {
      name: "Them Design Studios",
      role: "Design Engineer",
      period: "June 2018",
      description: "Built interactive marketing pages and a modern web presence for a creative agency — responsive portfolio site, custom CMS, and GSAP animations.",
      highlights: [
        "200% increase in inquiries post-launch",
        "Implemented custom CMS with robust content modeling",
        "Optimized performance achieving 95+ Lighthouse scores and excellent Core Web Vitals",
        "Custom GSAP animations and micro-interactions",
      ],
      technologies: ["React", "Firebase", "Contentful", "GSAP", "Tailwind CSS"],
      metric: "200% more inquiries · 95+ Lighthouse",
    },
    {
      name: "Earthbound Adventures",
      role: "Full Stack Developer",
      period: "May 2017",
      description: "Booking platform and marketing website for adventure tourism company offering hiking expeditions in Peru.",
      highlights: [
        "85% increase in booking conversions",
        "Interactive itinerary builder for custom trips",
        "Multi-currency support and localization infrastructure for international customers",
      ],
      technologies: ["React", "Firebase"],
      metric: "85% booking conversion increase",
    },
  ],
  selectedProjects: [
    {
      name: "Labelbox Evaluation Studio",
      description: "Co-built with a 2-person team — ML model evaluation platform with rubric scoring, QA, real-time cost/model analysis, and deep-link sharing.",
      technologies: ["React", "TypeScript", "Plotly", "Chart.js", "GraphQL"],
    },
    {
      name: "alignerr.com",
      description: "Built from ground up as sole engineer — custom Sanity CMS schema, Next.js App Router, full design system in Figma implemented in Tailwind.",
      technologies: ["Next.js", "Sanity CMS", "TypeScript", "Tailwind CSS", "Vercel"],
    },
    {
      name: "Labelbox Design System",
      description: "Storybook documentation + Figma-to-code pipeline with token-based theming, migrating the full site from Material UI to Tailwind.",
    },
    {
      name: "Auth & Security Gateway",
      description: "Centralized authentication and authorization system published as a private npm SDK with RBAC, JWT, OAuth, and audit logging.",
    },
  ],
  interests: [
    "Cars — how they're built, why some feel special, what makes people obsess over them",
    "Photography — capturing small moments, car meets, city walks, chasing good light in San Francisco and the Bay Area",
  ],
  philosophy:
    "I believe great products are built where design and engineering share the same vocabulary. The best digital experiences come from a blend of curiosity and craft.",
  knowledgeGraph: {
    overview: "Uday's portfolio features an interactive knowledge graph on the homepage that maps how his thinking connects across domains. Each node represents a concept he actively works with, written in his own voice.",
    domains: {
      accessibility: {
        summary: "I don't bolt accessibility on at the end. I build with semantic structure and keyboard models from the start — it's how I make sure the foundation is actually solid.",
        perspective: "If the semantics are right and the interaction model is sound, everything else gets easier. Accessibility isn't extra work, it's better architecture.",
        exploring: "Focus-order-first reviews — I run keyboard and focus audits before visual polish. Catches structural problems early instead of patching later.",
      },
      semanticHtml: {
        summary: "I write markup that means something — not just divs with classes. It makes the interface legible for users, crawlers, and screen readers without extra effort.",
        perspective: "The less custom logic I need to write, the more resilient the interface. Good semantics get me there.",
      },
      keyboardNavigation: {
        summary: "If I can't tab through a workflow smoothly, the interaction model is wrong. I design for keyboard first because it forces the structure to be explicit.",
        perspective: "When keyboard users move efficiently, it means the interaction hierarchy is actually working. Everyone benefits.",
      },
      designSystems: {
        summary: "I build systems that encode decisions, not just styles. Tokens, components, patterns — all structured so teams ship faster without drifting apart.",
        perspective: "A good design system makes the right thing the easy thing. I want teams to move fast and still end up consistent.",
        exploring: "Token consolidation — migrating scattered one-off styles into tokenized primitives. Less decisions per component, more consistency across surfaces.",
      },
      frontendArchitecture: {
        summary: "I care about how code is organized for the long term — component boundaries, data flow, rendering strategy. The goal is a codebase that can change without breaking.",
        perspective: "I draw clear lines between content, UI state, and platform constraints. That's how I keep things maintainable as scope grows.",
      },
      developerExperience: {
        summary: "I think a lot about how other engineers interact with what I build. Tooling, docs, defaults — if these are good, the whole team ships better work.",
        perspective: "DX is leverage. Better defaults and clearer documentation reduce the coordination tax that slows teams down.",
        exploring: "Storybook as alignment tool — I use component documentation to get teams on the same page before implementation diverges. Cheaper than fixing it after.",
      },
      aiSystems: {
        summary: "I don't ship AI as a feature. I find the repetitive bottlenecks — docs drifting, scaffolding, triage — and put automation there. That's where it actually helps.",
        perspective: "AI is operational infrastructure for me. Less about magic, more about removing the boring work that degrades quality over time.",
        exploring: "Auto-updating docs agent — built an agent that regenerates internal documentation on every PR merge. No more stale wikis.",
      },
      performance: {
        summary: "Fast interfaces aren't a nice-to-have for me — they're how users trust the product. I care about perceived speed, real latency, and interactions that feel instant.",
        perspective: "Speed supports trust. Especially in data-heavy workflows, a slow interface erodes confidence in the tool itself.",
      },
      contentSystems: {
        summary: "I design content models and publishing workflows that hold up as teams and channels multiply. The structure has to outlast any single redesign.",
        perspective: "I want messaging, metadata, and presentation to stay connected over time — not just work for the first launch.",
      },
      interactionDesign: {
        summary: "I design interactions to communicate where you are, what just happened, and what to do next. Patterns should reduce cognitive load, not add to it.",
        perspective: "Motion and interaction should explain the system to the user, not decorate it.",
      },
      motion: {
        summary: "I use motion to show where information came from and where it's going. It should teach the interface, not perform for the user.",
        perspective: "If a transition doesn't help the user understand what changed, it shouldn't be there.",
        exploring: "Context-preserving transitions — favoring transitions that show spatial relationships between states. Less fade-in/out, more movement that maps to where things actually live.",
      },
      photography: {
        summary: "Photography is how I practice seeing. Composition, light, timing — it trains the same instincts I use when framing interfaces and content.",
        perspective: "The discipline of noticing what matters in a frame carries over directly into product design. Both are about what to include and what to leave out.",
        exploring: "Visual storytelling → product flows — studying how editorial photo sequences create pacing and applying that rhythm to multi-step interfaces.",
      },
      cars: {
        summary: "Cars have been a thing for me since I was a kid. I'm drawn to machines where the engineering is felt, not explained — analog steering, mechanical grip, driver connection.",
        perspective: "The best engineering disappears into the experience. You don't think about it, you just feel it working. That's what I chase in interfaces too.",
        dreamCars: [
          "Lexus LFA — The V10 that revs to 9,000 rpm and sounds like nothing else. Engineering as art.",
          "BMW 1M — Short wheelbase, hydraulic steering, perfect weight. The last truly analog M car.",
          "Porsche 911 Targa — Open-top 911 with the roll bar. Timeless shape, mechanical feel, no compromise on character.",
          "Mitsubishi Evo 9 — Rally DNA for the street. Raw, mechanical, unfiltered. My childhood poster car.",
        ],
      },
    },
    conceptPaths: [
      {
        title: "Accessible defaults → scalable systems",
        insight: "Semantic-first components carry accessibility forward at scale.",
        flow: "Accessibility → Semantic HTML → Design Systems",
        evidence: "Labelbox — Token-based component library across teams",
      },
      {
        title: "System constraints → runtime quality",
        insight: "When the system constrains what ships, the frontend stays lean.",
        flow: "Design Systems → Architecture → Performance",
        evidence: "Triple Crown Products — 40% faster loads; Them Design Studios — 95+ Lighthouse",
      },
      {
        title: "Clear boundaries → useful automation",
        insight: "AI helps most at repetitive operational bottlenecks, not as a feature.",
        flow: "Architecture → Dev Experience → AI Systems",
        evidence: "Labelbox — AI agent for auto-updating internal docs",
      },
      {
        title: "Content structure → interaction quality",
        insight: "Wrong content model means the interaction layer fights it forever.",
        flow: "Content → Architecture → Interaction",
        evidence: "Earthbound Adventures — Booking flow driven by content alignment",
      },
      {
        title: "Motion that explains → without excluding",
        insight: "Every transition has to stay predictable for all users.",
        flow: "Motion → Interaction → Accessibility",
        evidence: "Them Design Studios — GSAP system supporting narrative without disruption",
      },
      {
        title: "Fast pages → content discipline",
        insight: "Payload shape, caching, and hydration all start with content structure.",
        flow: "Performance → Architecture → Content",
        evidence: "Labelbox — CMS + frontend tuned for speed at scale; TCP — 60% organic traffic growth",
      },
    ],
  },
  selfDescription: "I sit between design and engineering — not in the middle, but across both. I think in systems, ship in code, and care about how things connect end-to-end. I want the intent behind a design to survive all the way to production. That means I have to own both sides.",
};

export type PortfolioContext = typeof portfolioContext;
