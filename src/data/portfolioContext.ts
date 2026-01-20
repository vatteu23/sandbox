/**
 * Portfolio context data for the AI assistant
 */
export const portfolioContext = {
  personalInfo: {
    name: "Uday Vatti",
    title: "Sr. Web Developer and Designer",
    company: "Labelbox",
    location: "San Francisco, CA",
    email: "vuday23@gmail.com",
    linkedin: "https://www.linkedin.com/in/vattiu/",
    website: "https://udayvatti.com",
    yearsOfExperience: "9+",
  },
  websitePages: {
    home: { url: "/", description: "Home page with overview of Uday's work" },
    about: { url: "/about", description: "Detailed about page with bio, skills, and interests" },
    photography: { url: "/photography", description: "Uday's photography portfolio" },
    labelbox: { url: "/work/labelbox", description: "Details about Uday's work at Labelbox" },
    tcp: { url: "/work/tcp", description: "Details about Uday's work at Triple Crown Products" },
    cgs: { url: "/work/cgs", description: "Details about Uday's work at Center for Governmental Studies" },
    resume: { url: "/resume.pdf", description: "Uday's resume/CV in PDF format" },
  },
  summary:
    "Senior Web Developer & Designer with 9+ years of experience specializing in React, Next.js, and TypeScript. Currently leading web development across marketing websites and evaluation studio at Labelbox.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX Design",
    "Design Systems",
    "GSAP",
    "Framer Motion",
    "Sanity CMS",
    "GraphQL",
    "Figma",
    "Google Tag Manager",
    "SEO Optimization",
    "D3.js",
    "C#",
    ".NET",
    "SQL",
  ],
  whatIDo: [
    "UI/UX design in Figma and design systems",
    "Component architecture and development",
    "Performance optimization and monitoring",
  ],
  experience: [
    {
      company: "Labelbox",
      role: "Sr. Web Developer and Designer",
      period: "Nov, 2021 - Present",
      description:
        "Led full-stack development across multiple products, including the main marketing website and customer platforms for AI data labeling used by Fortune 500 companies.",
      achievements: [
        "Built Labelbox Evaluation Studio product with 2-person team, creating model performance visualization tools",
        "Migrated entire labelbox.com from Material UI to Tailwind CSS, improving performance and maintainability",
        "Built complex CMS structures enabling marketing team to autonomously update content with zero developer dependency",
        "Created high-performance pages using Next.js App Router with hybrid static/dynamic rendering",
        "Implemented advanced animations using GSAP and Framer Motion in client components",
        "Developed alignerr.com from ground up using custom Sanity CMS, delivering full-stack solution",
        "Implemented multi-modal data visualization supporting video, audio, text, and image formats",
        "Maintained GTM implementation and ensured SEO optimization across all projects",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Sanity CMS",
        "GSAP",
        "Framer Motion",
        "Google Tag Manager",
        "GraphQL",
        "Figma",
      ],
    },
    {
      company: "Triple Crown Products",
      role: "Full Stack Developer",
      period: "July, 2017 - Oct, 2021",
      description:
        "Led full-stack development of e-commerce platforms and internal systems, migrating parts of the website to React and .Net Core. Focused on performance optimization, SEO enhancement, and creating maintainable solutions for marketing team.",
      achievements: [
        "Developed custom webstores and e-commerce UIs with a reusable framework for different customers",
        "Created complex stored procedures for efficient data management and reporting",
        "Built a custom CMS enabling scheduled content releases and future feature deployments",
        "Improved website performance by 40% through optimization and caching strategies",
        "Enhanced SEO rankings resulting in 60% increase in organic traffic",
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
      ],
    },
    {
      company: "Center for Governmental Studies (NIU)",
      role: "Web Developer",
      period: "June, 2016 - May, 2017",
      description:
        "Core developer for interactive data visualization tools, collaborating with researchers and policymakers.",
      achievements: [
        "Implemented complex data analysis tools using D3.js and C# MVC architecture",
        "Built a responsive platform that visualized student graduation rates and other educational metrics",
        "Created interactive dashboards for data exploration and analysis",
        "Developed comprehensive filtering system for multi-dimensional data analysis",
      ],
      technologies: ["D3.js", "C#", "SQL", "MVC", "JavaScript", "Bootstrap"],
    },
  ],
  freelanceProjects: [
    {
      name: "Them Design Studios",
      role: "Full Stack Developer",
      period: "June, 2018",
      description:
        "Built modern web presence for creative agency specializing in brand identity and digital experiences for startups.",
      achievements: [
        "Delivered responsive portfolio site increasing inquiries by 200%",
        "Implemented custom CMS for easy content management",
        "Optimized performance achieving 95+ Lighthouse scores",
      ],
    },
    {
      name: "Earthbound Adventures",
      role: "Full Stack Developer",
      period: "May, 2017",
      description:
        "Developed booking platform and marketing website for adventure tourism company offering hiking expeditions in Peru.",
      achievements: [
        "Built booking system increasing conversions by 85%",
        "Created interactive itinerary builder for custom trips",
        "Implemented multi-currency support for international customers",
      ],
    },
  ],
  interests: [
    "Cars - how they're built, why some feel special, what makes people obsess over them",
    "Photography - capturing small moments, car meets, city walks, chasing good light",
  ],
  philosophy:
    "I believe the best digital experiences are built with a blend of curiosity and craft.",
};

export type PortfolioContext = typeof portfolioContext;
