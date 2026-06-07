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
};

export type PortfolioContext = typeof portfolioContext;
