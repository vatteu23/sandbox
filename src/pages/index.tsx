"use client";
import Container from "@/components/Container";
import HeadWithMetas from "@/components/HeadWithMetas";
import Layout from "@/components/Layout";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import ProjectRow from "@/components/ProjectRow";

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
      "Led design and full-stack development across labelbox.com, alignerr.com, and internal evaluation tooling. Built the gap between Figma and production — from component libraries and motion systems to cloud data pipelines.",
    achievements: [
      "Built Labelbox Evaluation Studio product with 2-person team, creating model performance visualization tools. Read about it in the <a href='https://labelbox.com/blog/introducing-labelbox-evaluation-studio-drive-agi-advancements-with-real-time-feedback-on-model-performance/' target='_blank' rel='noopener noreferrer' style='text-decoration: underline; font-weight: 500;'>product launch blog</a>",
      "Led Storybook adoption for design system documentation, establishing shared component library across product teams",
      "Migrated labelbox.com from Material UI to Tailwind CSS, defining token-based theming and reusable design primitives",
      "Built centralized auth and authorization gateway published as private npm SDK, eliminating redundant auth across internal products",
      "Developed alignerr.com from ground up using custom Sanity CMS — sole engineer from concept to production deployment",
      "Implemented GSAP and Framer Motion animation systems across marketing and product pages",
      "Engineered GCS auto-scan service for automated data discovery, establishing the standard production ingestion pattern",
      "Built security issue tracker for DevOps/SecOps team from scratch",
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
      "Full-stack ownership of <a href='https://labelbox.com' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;text-underline-offset:3px;'>labelbox.com</a>, <a href='https://prism.labelbox.com' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;text-underline-offset:3px;'>prism.labelbox.com</a> and <a href='https://alignerr.com' target='_blank' rel='noopener noreferrer' style='text-decoration:underline;text-underline-offset:3px;'>alignerr.com</a>",
      "Created data visualization tools for ML model performance comparison",
      "Led Figma-to-code design system workflow across product teams",
      "Established rapid prototyping workflow from concept to production deployment",
      "Built SEO-first architecture improving organic traffic and conversion",
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
      "Led full-stack development and UI design for e-commerce platforms, migrating legacy systems to React with Tailwind CSS. Focused on performance optimization, SEO, and building tools that empowered the marketing team.",
    metric: "40% faster · 60% more organic traffic",
    achievements: [
      "Developed custom webstores and e-commerce UIs with a reusable component framework",
      "Improved website performance by 40% through optimization and caching strategies",
      "Enhanced SEO rankings resulting in 60% increase in organic traffic",
      "Built a custom CMS enabling scheduled content releases and future feature deployments",
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
      "Core developer for interactive data visualization tools, collaborating with researchers and policymakers to make complex educational metrics explorable and accessible.",
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
      "Built a modern web presence for a creative agency specializing in brand identity and digital experiences for startups.",
    metric: "200% more inquiries · 95+ Lighthouse",
    achievements: [
      "Delivered responsive portfolio site increasing inquiries by 200%",
      "Implemented custom CMS for easy content management",
      "Optimized performance achieving 95+ Lighthouse scores",
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

export default function Home() {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.fromTo(
        ".name-anim",
        { x: -60, opacity: 0, rotate: -8 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "back.out(1.4)",
          duration: 0.9,
          transformOrigin: "top",
          stagger: { each: 0.08, from: "random" },
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (text: string) =>
    text.split("").map((letter, index) => (
      <span key={index} className={`inline-block name-anim name-anim-${index}`}>
        {letter}
      </span>
    ));

  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen">
      <HeadWithMetas
        title="Uday Vatti — Design Engineer"
        description="Design Engineer building the gap between Figma and production. 9+ years crafting design systems, motion, and full-stack platforms at Labelbox."
        url="https://udayvatti.com"
        image="/images/uv-port.png"
      />

      {/* Hero */}
      <div className="pt-32 pb-40">
        <Container>
          <div ref={component}>
            <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-8">
              Design Engineer · San Francisco
            </p>
            <h1
              className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-10"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              {renderLetters("Uday")} {renderLetters("Vatti")}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed mb-12">
              I build high-performance React and Next.js experiences for teams
              that care about speed, design, SEO, and scale. Currently at{" "}
              <a
                href="https://www.labelbox.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-100 border-b border-neutral-400 dark:border-neutral-600 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors duration-200"
              >
                Labelbox
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-7">
              <Link
                href="/work"
                className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:opacity-50 transition-opacity"
              >
                Work →
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                About →
              </Link>
              <a
                href="https://www.linkedin.com/in/vattiu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Get in touch →
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Work */}
      <div className="border-t border-neutral-100 dark:border-neutral-900">
        <Container className="py-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Work
            </span>
            <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
          </div>
          <div className="max-w-4xl">
            {Porjects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </div>
        </Container>
      </div>

      {/* Freelance */}
      <div className="border-t border-neutral-100 dark:border-neutral-900">
        <Container className="py-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Freelance
            </span>
            <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
          </div>
          <div className="max-w-4xl">
            {Freelance.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </div>
        </Container>
      </div>

      <Footer />
    </Layout>
  );
}
