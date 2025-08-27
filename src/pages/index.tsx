"use client";
import Container from "@/components/Container";
import HeadWithMetas from "@/components/HeadWithMetas";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Typography from "@/components/Typography";
import { gsap } from "gsap";
import {
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PorjectProps = {
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
};

const Porjects: PorjectProps[] = [
  {
    name: "Labelbox",
    link: "https://www.labelbox.com/",
    src: "/images/lb.svg",
    role: "Sr. Web Developer and Designer",
    year: "Nov, 2021 - Present",
    description:
      "Led full-stack development across multiple products, including the main marketing website and customer platforms for AI data labeling used by Fortune 500 companies.",
    achievements: [
      "Built Labelbox Evaluation Studio product with 2-person team, creating model performance visualization tools. Read about it in the <a href='https://labelbox.com/blog/introducing-labelbox-evaluation-studio-drive-agi-advancements-with-real-time-feedback-on-model-performance/' target='_blank' rel='noopener noreferrer' style='color: #800080; transition: all 0.2s ease-in-out; padding: 0 0.25rem; font-weight: 500; display: inline-block; border-bottom: 2px solid #e5e7eb; text-decoration: none;'>product launch blog</a>",
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
    teamSize:
      "Cross-functional teams varying from 2-12 members (designers, engineers, PMs, marketing)",
    highlights: [
      "Full-stack ownership of labelbox.com and alignerr.com websites",
      "Created data visualization tools for ML model performance comparison",
      "Established rapid prototyping workflow from concept to production deployment",
      "Collaborated across design, product, and marketing teams to align on business goals",
      "Built SEO-first architecture resulting in improved organic traffic and conversion",
    ],
  },
  {
    name: "Triple Crown Products",
    link: "https://triplecrownproducts.com/",
    src: "/images/tcp.svg",
    role: "Full Stack Developer",
    year: "July, 2017 - Oct, 2021",
    description:
      "Led full-stack development of e-commerce platforms and internal systems, migrating parts of the website to React with Tailwind CSS. Focused on performance optimization, SEO enhancement, and creating maintainable solutions for marketing team.",
    achievements: [
      "Developed custom webstores and e-commerce UIs with a reusable framework for different customers",
      "Created complex stored procedures for efficient data management and reporting",
      "Built a custom CMS enabling scheduled content releases and future feature deployments",
      "Improved website performance by 40% through optimization and caching strategies",
      "Enhanced SEO rankings resulting in 60% increase in organic traffic",
      "Implemented automated content management tools for marketing team autonomy",
      "Created sales dashboard with real-time analytics and reporting features",
      "Created marketing materials and website assets using Corel Draw for enhanced brand consistency",
      "Collaborated with designers to enhance marketing website and user experience",
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
      "Built framework for rapid custom webstore development",
      "Implemented content scheduling system for future releases",
      "Achieved significant performance and SEO improvements",
      "Empowered marketing team with automated content tools",
      "Seamlessly integrated legacy and modern tech stacks",
      "Enhanced developer and admin workflow with CMS tools",
    ],
  },
  {
    name: "Center for Governmental Studies",
    link: "https://www.cgs.niu.edu/",
    src: "/images/niu.svg",
    role: "Web Developer",
    year: "June, 2016 - May, 2017",
    description:
      "Core developer for interactive data visualization tools, collaborating with researchers and policymakers.",
    achievements: [
      "Implemented complex data analysis tools using D3.js and C# MVC architecture",
      "Built a responsive platform that visualized student graduation rates and other educational metrics",
      "Created interactive dashboards for data exploration and analysis",
      "Developed comprehensive filtering system for multi-dimensional data analysis",
    ],
    technologies: ["D3.js", "C#", "SQL", "MVC", "JavaScript", "Bootstrap"],
    teamSize:
      "Team of 2 developers collaborating with researchers and data analysts",
    highlights: [
      "Visualized educational datasets for the 60by25 initiative tracking graduation rates",
      "Collaborated with researchers to create intuitive data exploration tools",
      "Built analysis platform used by education stakeholders and government agencies",
    ],
  },
];

const Freelance: PorjectProps[] = [
  {
    name: "Them Design Studios",
    link: "https://themdesignstudios.com/",
    src: "/images/them.svg",
    role: "Full Stack Developer",
    year: "June, 2018",
    description:
      "Built modern web presence for creative agency specializing in brand identity and digital experiences for startups.",
    achievements: [
      "Delivered responsive portfolio site increasing inquiries by 200%",
      "Implemented custom CMS for easy content management",
      "Optimized performance achieving 95+ Lighthouse scores",
    ],
    technologies: [
      "React",
      "Firebase",
      "Contentful",
      "GSAP",
      "Styled Components",
    ],
    highlights: [
      "Collaborative design-development process",
      "Custom animations and micro-interactions",
      "Mobile-first responsive design",
    ],
  },
  {
    name: "Earthbound Adventures",
    link: "https://incatrailhikes.com/",
    src: "/images/them.svg",
    role: "Full Stack Developer",
    year: "May, 2017",
    description:
      "Developed booking platform and marketing website for adventure tourism company offering hiking expeditions in Peru.",
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
  const component = useRef<any>(null);
  const [selectedProject, setSelectedProject] = useState<PorjectProps | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.fromTo(
        ".name-anim",
        {
          x: -80,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.7)",
          duration: 1,
          transformOrigin: "top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (text: string) => {
    return text.split("").map((letter, index) => {
      return (
        <span
          key={index}
          className={`inline-block name-anim name-anim-${index}`}
        >
          {" "}
          {letter}
        </span>
      );
    });
  };

  const handleUrlClick = (url: string) => {
    window.open(url, "_blank");
  };

  const openProjectModal = (project: PorjectProps) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Layout className="bg-purple-50 min-h-screen">
      <HeadWithMetas
        title="Uday Vatti"
        description="Uday Vatti is a web developer and a designer at Labelbox."
        url="https://udayvatti.com"
        image="/images/uv-port.png"
      />
      <div className="py-20 md:py-32">
        <Container>
          <div className="text-center max-w-4xl mx-auto" ref={component}>
            <Typography
              variant="h5"
              fontWeight="semibold"
              className="mb-6 text-purple-600 tracking-wide uppercase"
              fontFamily="mono"
            >
              Hello, I'm
            </Typography>
            <Typography
              variant="h1"
              className="!leading-tight mb-8 text-purple-800 text-5xl md:text-6xl lg:text-7xl"
              fontWeight="bold"
              fontFamily="display"
            >
              {renderLetters(`Uday`)} {renderLetters(`Vatti`)}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="normal"
              className="mb-12 text-purple-600 max-w-2xl mx-auto leading-loose text-lg md:text-2xl"
              fontFamily="primary"
            >
              Sr. Web Developer and Designer crafting digital experiences at{" "}
              <Link
                className=" text-purple-800 transition-all duration-200 ease-in-out px-4 py-1 font-medium inline-block mx-1 border-b-2 border-purple-200 hover:border-purple-500"
                href="https://www.labelbox.com/"
              >
                Labelbox
              </Link>
            </Typography>

            {/* Figma-style skill tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="px-4 py-2 bg-purple-800 rounded-full text-xs md:text-sm font-medium text-purple-200 hover:bg-purple-800 transition-colors font-mono">
                React & Next.js
              </span>
              <span className="px-4 py-2 bg-purple-800 rounded-full text-xs md:text-sm font-medium text-purple-200 hover:bg-purple-800 transition-colors font-mono">
                UI/UX Design
              </span>
              <span className="px-4 py-2 bg-purple-800 rounded-full text-xs md:text-sm font-medium text-purple-200 hover:bg-purple-800 transition-colors font-mono">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-purple-800 rounded-full text-xs md:text-sm font-medium text-purple-200 hover:bg-purple-800 transition-colors font-mono">
                Design Systems
              </span>
            </div>
          </div>
        </Container>
      </div>

      <div className="py-20 bg-purple-100">
        <Container>
          <div className="text-center mb-16">
            <Typography
              variant="h5"
              fontWeight="semibold"
              className="mb-6 text-purple-600 tracking-wide uppercase"
              fontFamily="mono"
            >
              Professional Experience
            </Typography>

            <Typography
              variant="h6"
              className="text-purple-600 max-w-2xl mx-auto"
              fontFamily="primary"
              fontWeight="light"
            >
              Building digital products and experiences across various
              industries
            </Typography>
          </div>
          <div className="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto">
            {Porjects.map((project: PorjectProps, index: number) => {
              return (
                <div
                  onClick={() => openProjectModal(project)}
                  className="group cursor-pointer bg-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ease-out border border-purple-200 "
                  key={index}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <Typography
                        variant="h4"
                        fontWeight="normal"
                        className="text-purple-800 mb-2 group-hover:text-purple-800/90 transition-colors"
                        fontFamily="primary"
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="normal"
                        className="text-purple-700 mb-3"
                        fontFamily="primary"
                      >
                        {project.role}
                      </Typography>
                      <Typography
                        variant="p"
                        className="text-purple-600 text-sm mb-2"
                        fontFamily="primary"
                      >
                        {project.year}
                      </Typography>
                      {project.description && (
                        <Typography
                          variant="p"
                          className="text-purple-600 text-sm line-clamp-2"
                          fontFamily="primary"
                        >
                          {project.description}
                        </Typography>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex gap-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-800 transition-all duration-300 transform group-hover:scale-105">
                        <EyeIcon className="w-5 h-5 text-purple-600 group-hover:text-purple-200" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUrlClick(project.link);
                        }}
                        className="w-10 h-10  bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-800 text-purple-600 hover:text-purple-200 transition-all duration-300 transform hover:scale-105 hover:rotate-12"
                      >
                        <ArrowTopRightOnSquareIcon className="w-5 h-5 " />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
      <div className="py-20 bg-purple-50">
        <Container>
          <div className="text-center mb-16">
            <Typography
              variant="h5"
              fontWeight="semibold"
              className="mb-6 text-purple-600 tracking-wide uppercase"
              fontFamily="mono"
            >
              Freelance Projects
            </Typography>
            <Typography
              variant="h6"
              className="text-purple-600 max-w-2xl mx-auto"
              fontFamily="primary"
              fontWeight="light"
            >
              Selected client work and independent projects
            </Typography>
          </div>
          <div className="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto">
            {Freelance.map((project: PorjectProps, index: number) => {
              return (
                <div
                  onClick={() => openProjectModal(project)}
                  className="group cursor-pointer bg-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ease-out border border-purple-200 "
                  key={index}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <Typography
                        variant="h4"
                        fontWeight="normal"
                        className="text-purple-800 mb-2 group-hover:text-purple-800/90 transition-colors"
                        fontFamily="primary"
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="normal"
                        className="text-purple-600 mb-3"
                        fontFamily="primary"
                      >
                        {project.role}
                      </Typography>
                      <Typography
                        variant="p"
                        className="text-purple-600 text-sm mb-2"
                        fontFamily="primary"
                      >
                        {project.year}
                      </Typography>
                      {project.description && (
                        <Typography
                          variant="p"
                          className="text-purple-600 text-sm line-clamp-2"
                          fontFamily="primary"
                        >
                          {project.description}
                        </Typography>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex gap-2">
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-800 transition-all duration-300 transform group-hover:scale-105 border border-purple-200">
                        <EyeIcon className="w-5 h-5 text-purple-600 group-hover:text-purple-200" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUrlClick(project.link);
                        }}
                        className="w-10 h-10 bg-purple-50 rounded-full flex   items-center justify-center hover:bg-purple-800 text-purple-600 hover:text-purple-200 transition-all duration-300 transform hover:scale-105 hover:rotate-12 border border-purple-200"
                      >
                        <ArrowTopRightOnSquareIcon className="w-5 h-5 " />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Figma-style CTA section */}
      <div className="py-20 bg-purple-900">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Typography
              variant="h2"
              fontWeight="light"
              className="text-purple-200 mb-6"
              fontFamily="primary"
            >
              Let's work together
            </Typography>
            <Typography
              variant="h6"
              className="text-purple-100 mb-8 leading-relaxed"
              fontFamily="primary"
              fontWeight="light"
            >
              Interested in collaborating on your next project? I'd love to hear
              about your ideas and help bring them to life.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/vattiu/"
                className="bg-purple-50 text-purple-800 px-8 py-4 rounded-lg font-medium hover:bg-purple-200  transition-all duration-300 inline-block"
              >
                Get in touch
              </Link>
              <Link
                href="/photography"
                className="border border-purple-200 text-white px-8 py-4 rounded-lg font-medium  hover:bg-purple-200 hover:text-purple-800 transition-all duration-300 inline-block"
              >
                View photography
              </Link>
              <Link
                href="/resume-august-2025.pdf"
                target="_blank"
                className="border border-purple-200 text-white px-8 py-4 rounded-lg font-medium hover:bg-purple-200 hover:text-purple-800 transition-all duration-300 inline-block"
              >
                View resume
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Project Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProject && (
          <div className="relative">
            {/* Project Header */}
            <div className="sticky top-0 p-8 py-6 border-b border-purple-200 bg-purple-50/30 backdrop-blur-2xl ">
              <div className="absolute top-4 right-2">
                <button
                  onClick={closeModal}
                  className="bg-purple-100 text-purple-600 px-2 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-y-3 items-start justify-between md:mt-8">
                <div>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    className="text-purple-800 mb-2"
                    fontFamily="primary"
                  >
                    {selectedProject.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="text-purple-600 mb-2"
                    fontFamily="primary"
                  >
                    {selectedProject.role}
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-purple-600"
                    fontFamily="primary"
                  >
                    {selectedProject.year}
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUrlClick(selectedProject.link)}
                    className="bg-purple-800 text-purple-200 px-6 py-2 rounded-lg hover:bg-purple-800/90 transition-colors font-medium"
                  >
                    Visit Website ↗
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8 mt-6 p-8">
              {/* Description */}
              <div>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="text-purple-800 mb-3"
                  fontFamily="primary"
                >
                  Overview
                </Typography>
                <Typography
                  variant="p"
                  className="text-purple-600 leading-relaxed"
                  fontFamily="primary"
                >
                  {selectedProject.description}
                </Typography>
              </div>

              {/* Key Achievements */}
              {selectedProject.achievements && (
                <div>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="text-purple-800 mb-4"
                    fontFamily="primary"
                  >
                    Key Achievements
                  </Typography>
                  <div className="grid gap-3">
                    {selectedProject.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                        <Typography
                          variant="p"
                          className="text-purple-600"
                          fontFamily="primary"
                        >
                          <span
                            dangerouslySetInnerHTML={{ __html: achievement }}
                          />
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {selectedProject.technologies && (
                <div>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="text-purple-800 mb-4"
                    fontFamily="primary"
                  >
                    Technologies Used
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-300/50 rounded-full text-sm text-purple-600 font-medium font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Size */}
              {selectedProject.teamSize && (
                <div>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="text-purple-800 mb-2"
                    fontFamily="primary"
                  >
                    Team Collaboration
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-purple-600"
                    fontFamily="primary"
                  >
                    {selectedProject.teamSize}
                  </Typography>
                </div>
              )}

              {/* Project Highlights */}
              {selectedProject.highlights && (
                <div>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="text-purple-800 mb-4"
                    fontFamily="primary"
                  >
                    Project Highlights
                  </Typography>
                  <div className="grid gap-3">
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                        <Typography
                          variant="p"
                          className="text-purple-600"
                          fontFamily="primary"
                        >
                          {highlight}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
}
