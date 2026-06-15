export type ImpactItem = {
  category: string;
  text: string;
  stat: string;
  icon: string;
};

export type PorjectProps = {
  id: string;
  name: string;
  link: string;
  src: string;
  role?: string;
  year?: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
  teamSize?: string;
  highlights?: string[];
  metric?: string;
  impacts?: ImpactItem[];
};

export const Porjects: PorjectProps[] = [
  {
    id: "labelbox",
    name: "Labelbox",
    link: "https://www.labelbox.com/",
    src: "/images/lb.svg",
    role: "Sr. Design Engineer",
    year: "2021 – Present",
    metric: "End-to-end ownership · concept to launch",
    description:
      "Led design and full-stack development across labelbox.com, alignerr.com, and internal tooling. Bridged the gap between Figma and production by architecting design system code, motion systems, and cloud data pipelines.",
    achievements: [
      "Sole engineer on labelbox.com — owning the frontend architecture from Figma to production: implemented token-based design system code, optimized Core Web Vitals, and established a technical SEO strategy",
      "Built alignerr.com from the ground up: designed scalable CMS architecture with robust content modeling and automated publishing workflows",
      "Built Labelbox Evaluation Studio product with 2-person team, creating complex data visualization systems for model performance. Read about it in the <a href='https://labelbox.com/blog/introducing-labelbox-evaluation-studio-drive-agi-advancements-with-real-time-feedback-on-model-performance/' target='_blank' rel='noopener noreferrer' style='text-decoration: underline; font-weight: 500;'>product launch blog</a>",
      "Led Storybook adoption for design system documentation, establishing a shared component library used across marketing and product teams",
      "Built centralized auth and authorization gateway published as a private npm SDK, eliminating redundant auth logic across internal products",
      "Implemented GSAP and Framer Motion animation systems across interactive marketing pages",
      "Built an AI agent that automatically updates internal docs on every PR merge — eliminating documentation drift across teams. Use Claude and Cursor daily for scaffolding, prototyping, bug triage, and PR descriptions",
      "Engineered GCS auto-scan service and localization infrastructure for automated data discovery and global content delivery",
      "Maintained GTM implementation and drove technical SEO optimization across all marketing properties",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Sanity CMS",
      "GSAP",
      "Framer Motion",
      "Figma",
      "Storybook",
      "GCP",
      "BigQuery",
      "Google Tag Manager",
      "GraphQL",
    ],
    teamSize:
      "Cross-functional teams varying from 2–12 members (designers, engineers, PMs, marketing)",
    highlights: [
      "Sole engineer on <a href='https://labelbox.com' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;text-underline-offset:3px;'>labelbox.com</a>, <a href='https://prism.labelbox.com' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;text-underline-offset:3px;'>prism.labelbox.com</a>, and <a href='https://alignerr.com' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;text-underline-offset:3px;'>alignerr.com</a> — large-scale enterprise brand & marketing sites — from brand identity and design system to SEO architecture and production deployment",
      "Created data visualization tools for ML model performance comparison",
      "Led Figma-to-code design system workflow across marketing and product teams",
      "Integrated Claude and Cursor into daily workflow for AI-assisted prototyping and delivery",
      "Built SEO-first architecture improving organic traffic and conversion",
    ],
    impacts: [
      {
        category: "Ownership",
        text: "Sole engineer across labelbox.com, prism.labelbox.com, and alignerr.com — from brand identity and design system to SEO architecture and production deployment.",
        stat: "3 properties",
        icon: "Globe2",
      },
      {
        category: "Product",
        text: "Built Labelbox Evaluation Studio with a 2-person team — complex data visualization for real-time ML model performance comparison.",
        stat: "2-person team",
        icon: "BarChart2",
      },
      {
        category: "Design Systems",
        text: "Led token-based Figma-to-code design system workflow with Storybook component library shared across marketing and product teams.",
        stat: "Multi-team",
        icon: "Layers",
      },
      {
        category: "AI Tooling",
        text: "Built an AI agent that auto-updates internal docs on every PR merge, eliminating documentation drift. Use Claude and Cursor daily for scaffolding, prototyping, and bug triage.",
        stat: "Zero drift",
        icon: "Bot",
      },
      {
        category: "Performance",
        text: "SEO-first architecture with Core Web Vitals optimization, GTM implementation, and technical SEO strategy driving consistent organic growth.",
        stat: "95+ Lighthouse",
        icon: "Zap",
      },
    ],
  },
  {
    id: "tcp",
    name: "Triple Crown Products",
    link: "https://triplecrownproducts.com/",
    src: "/images/tcp.svg",
    role: "Full Stack Developer",
    year: "2017 – 2021",
    description:
      "Led frontend architecture and UI design for e-commerce platforms, migrating legacy systems to React with Tailwind CSS. Focused on Core Web Vitals, technical SEO, and building tools that empowered the marketing team.",
    metric: "40% faster · 60% more organic traffic",
    achievements: [
      "Developed custom webstores and e-commerce UIs with a reusable component framework",
      "Improved website performance by 40% through optimization and caching strategies",
      "Enhanced SEO rankings resulting in 60% increase in organic traffic",
      "Built a custom CMS with automated publishing workflows, enabling scheduled content releases and future feature deployments",
      "Created marketing materials and website assets using Corel Draw for brand consistency",
      "Created sales dashboard with real-time analytics and reporting features",
      "Implemented .NET Core APIs to support modern web architecture",
    ],
    technologies: [
      "C#",
      ".NET",
      ".NET Core",
      "SQL",
      "React",
      "Tailwind CSS",
      "Stored Procedures",
      "CMS Development",
      "Corel Draw",
    ],
    teamSize: "Full-stack developer working with design and marketing teams",
    highlights: [
      "40% performance improvement through optimization and caching",
      "60% increase in organic traffic from SEO enhancements",
      "Built framework for rapid custom webstore development",
      "Content scheduling system for future releases",
      "Enhanced developer and admin workflow with custom CMS tools",
    ],
  },
  {
    id: "cgs",
    name: "Center for Governmental Studies",
    link: "https://www.cgs.niu.edu/",
    src: "/images/niu.svg",
    role: "Web Developer",
    year: "2016 – 2017",
    description:
      "Core developer for interactive data visualization systems, collaborating with researchers and policymakers to make complex educational metrics explorable and accessible.",
    achievements: [
      "Designed and built interactive visualization tools using D3.js and C# MVC architecture",
      "Built a responsive platform visualizing student graduation rates for the 60by25 initiative",
      "Created interactive dashboards for multi-dimensional data exploration",
      "Developed comprehensive filtering system for complex educational datasets",
    ],
    technologies: ["D3.js", "C#", "SQL", "MVC", "JavaScript", "Bootstrap"],
    teamSize:
      "Team of 2 developers collaborating with researchers and data analysts",
    highlights: [
      "Visualized educational datasets for the 60by25 initiative tracking graduation rates",
      "Collaborated with researchers to build intuitive data exploration tools",
      "Built analysis platform used by education stakeholders and government agencies",
    ],
  },
];

export const Freelance: PorjectProps[] = [
  {
    id: "them-design-studios",
    name: "Them Design Studios",
    link: "https://themdesignstudios.com/",
    src: "/images/them.svg",
    role: "Design Engineer",
    year: "2018",
    description:
      "Built interactive marketing pages and a modern web presence for a creative agency specializing in brand identity and digital experiences.",
    metric: "200% more inquiries · 95+ Lighthouse",
    achievements: [
      "Delivered responsive portfolio site increasing inquiries by 200%",
      "Implemented custom CMS with robust content modeling for easy content management",
      "Optimized performance achieving 95+ Lighthouse scores and excellent Core Web Vitals",
      "Designed custom animations and micro-interactions with GSAP",
    ],
    technologies: [
      "React",
      "Firebase",
      "Contentful",
      "GSAP",
      "Styled Components",
      "Tailwind CSS",
    ],
    highlights: [
      "Collaborative design-development process from concept to launch",
      "Custom GSAP animations and micro-interactions",
      "Mobile-first responsive design with 95+ Lighthouse scores",
    ],
  },
  {
    id: "earthbound-adventures",
    name: "Earthbound Adventures",
    link: "https://incatrailhikes.com/",
    src: "/images/them.svg",
    role: "Full Stack Developer",
    year: "2017",
    description:
      "Developed booking platform and marketing website for adventure tourism company offering hiking expeditions in Peru.",
    metric: "85% booking conversion increase",
    achievements: [
      "Built booking system increasing conversions by 85%",
      "Created interactive itinerary builder for custom trips",
      "Implemented multi-currency support for international customers",
    ],
    technologies: ["React", "Firebase"],
    highlights: [
      "Real-time availability and pricing system",
      "Integration with local tour operator APIs",
      "Mobile-optimized for travelers researching on-the-go",
    ],
  },
];
