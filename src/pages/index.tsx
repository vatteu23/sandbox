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

type TabType = "about" | "experience" | "projects";

const Porjects: PorjectProps[] = [
  {
    name: "Labelbox",
    link: "https://www.labelbox.com/",
    src: "/images/lb.svg",
    role: "Sr. Web Developer and Designer",
    year: "Nov, 2021 - Present",
    description:
      "Leading frontend development across multiple products including the main marketing website, internal evaluation tools, and customer-facing platforms for AI data labeling used by Fortune 500 companies.",
    achievements: [
      "Migrated entire labelbox.com from Material UI to Tailwind CSS, improving performance and maintainability",
      "Built complex CMS structures enabling marketing team to autonomously update content with zero developer dependency",
      "Created high-performance pages using Next.js App Router with hybrid static/dynamic rendering",
      "Implemented advanced animations using GSAP and Framer Motion in client components",
      "Developed alignerr.com from ground up using custom Sanity CMS, delivering full-stack solution",
      "Built internal evals product with 2-person team, creating model performance visualization tools",
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
      "Led full-stack development of e-commerce platforms and internal systems using C# .NET, .NET Core API, and SQL, while successfully migrating parts of the website to React with Tailwind CSS. Focused on performance optimization, SEO enhancement, and creating maintainable solutions for sales and marketing teams.",
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
      "Developed data visualization tools and web applications for political research and public policy analysis at Northern Illinois University.",
    achievements: [
      "Created interactive dashboards for election data analysis",
      "Built responsive websites viewed by 50,000+ researchers annually",
      "Developed custom CMS for policy research publications",
      "Improved site performance by 60% through optimization",
    ],
    technologies: [
      "JavaScript",
      "D3.js",
      "PHP",
      "MySQL",
      "WordPress",
      "Bootstrap",
    ],
    teamSize: "Team of 2 developers with academic researchers",
    highlights: [
      "Visualized complex political and economic datasets",
      "Collaborated with PhD researchers on data presentation",
      "Built tools used by government agencies and academic institutions",
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
      "Gatsby",
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
    name: "Boodh",
    link: "https://www.boodh.org/",
    src: "/images/them.svg",
    role: "Full Stack Developer",
    year: "October, 2020",
    description:
      "Created digital platform for nonprofit organization focused on education and community development in underserved regions.",
    achievements: [
      "Built donation platform processing $100K+ annually",
      "Created volunteer management system used by 500+ volunteers",
      "Designed multilingual interface supporting 3 languages",
    ],
    technologies: ["Next.js", "Stripe", "Airtable", "Vercel", "Tailwind CSS"],
    highlights: [
      "Integrated payment processing and donor management",
      "Built admin dashboard for program tracking",
      "Optimized for low-bandwidth internet connections",
    ],
  },
  {
    name: "Earthbound Adventures",
    link: "https://incatrailhikes.com/",
    src: "/images/them.svg",
    role: "Full Stack Developer",
    year: "May, 2019",
    description:
      "Developed booking platform and marketing website for adventure tourism company offering hiking expeditions in Peru.",
    achievements: [
      "Built booking system increasing conversions by 85%",
      "Created interactive itinerary builder for custom trips",
      "Implemented multi-currency support for international customers",
    ],
    technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe", "Mapbox"],
    highlights: [
      "Real-time availability and pricing system",
      "Integration with local tour operator APIs",
      "Mobile-optimized for travelers researching on-the-go",
    ],
  },
];

export default function Home() {
  const component = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedProject, setSelectedProject] = useState<PorjectProps | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Clear predefined content with proper formatted text
  const aboutContent =
    "Web developer. Photographer. Car enthusiast. I craft clean, user-friendly web experiences and capture timeless portraits. Passionate about creating something special? <link>Let's chat</link>";

  const experienceContent =
    "Over 6 years of professional experience in web development, working with companies like Labelbox, Triple Crown Products, and the Center for Governmental Studies. Specialized in React, Next.js, and modern frontend technologies. <link>Ask for details</link>";

  const projectsContent =
    "Worked on diverse projects from e-commerce platforms to data annotation tools. Created innovative solutions for clients including Them Studios, Boodh, and Earthbound Adventures. Focused on user-friendly interfaces and efficient code.";

  // Simplify the experience details content to avoid any potential formatting issues
  const detailedContent =
    "Over 6 years of professional experience in web development:\n\n" +
    "• Labelbox (2021-Present): Developed UI components for AI data labeling platform\n" +
    "• Triple Crown Products (2017-2021): Led e-commerce site redesign, increasing conversion by 32%\n" +
    "• Center for Governmental Studies (2016-2017): Created data visualization dashboards\n\n" +
    "Technical skills include React, TypeScript, Next.js, Node.js, and modern CSS frameworks.";

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

  // Effect for typing animation - simplified for reliability
  useEffect(() => {
    // First, determine which content to show based on active tab
    const contentToShow =
      activeTab === "about"
        ? aboutContent
        : activeTab === "experience"
        ? experienceContent
        : projectsContent;

    // Reset content and set generating state
    setGeneratedContent("");
    setIsGenerating(true);

    // Create a timer ID for cleanup
    let timerId: NodeJS.Timeout;
    let currentPosition = 0;

    // Function to add the next character
    const addNextChar = () => {
      if (currentPosition < contentToShow.length) {
        setGeneratedContent(contentToShow.substring(0, currentPosition + 1));
        currentPosition++;
        timerId = setTimeout(addNextChar, 20);
      } else {
        setIsGenerating(false);
      }
    };

    // Start the typing animation
    addNextChar();

    // Cleanup function
    return () => {
      if (timerId) clearTimeout(timerId);
      setIsGenerating(false);
    };
  }, [activeTab, aboutContent, experienceContent, projectsContent]);

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
    <Layout className="bg-stone-100 min-h-screen">
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
              className="mb-6 text-gray-600 tracking-wide uppercase"
              fontFamily="mono"
            >
              Hello, I'm
            </Typography>
            <Typography
              variant="h1"
              className="!leading-tight mb-8 text-gray-900 text-5xl md:text-6xl lg:text-7xl"
              fontWeight="bold"
              fontFamily="display"
            >
              {renderLetters(`Uday`)} {renderLetters(`Vatti`)}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="normal"
              className="mb-12 text-gray-700 max-w-2xl mx-auto leading-loose text-lg md:text-2xl"
              fontFamily="primary"
            >
              Sr. Web Developer and Designer crafting digital experiences at{" "}
              <Link
                className=" text-gray-900 transition-all duration-200 ease-in-out px-4 py-1 font-medium inline-block mx-1 border-b-2 border-gray-200 hover:border-gray-500"
                href="https://www.labelbox.com/"
              >
                Labelbox
              </Link>
            </Typography>

            {/* Figma-style skill tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="px-4 py-2 bg-stone-300/50 rounded-full text-xs md:text-sm font-medium text-neutral-700 hover:bg-stone-200 transition-colors font-mono">
                React & Next.js
              </span>
              <span className="px-4 py-2 bg-stone-300/50 rounded-full text-xs md:text-sm font-medium text-neutral-700 hover:bg-stone-200 transition-colors font-mono">
                UI/UX Design
              </span>
              <span className="px-4 py-2 bg-stone-300/50 rounded-full text-xs md:text-sm font-medium text-neutral-700 hover:bg-stone-200 transition-colors font-mono">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-stone-300/50 rounded-full text-xs md:text-sm font-medium text-neutral-700 hover:bg-stone-200 transition-colors font-mono">
                Design Systems
              </span>
            </div>
          </div>
        </Container>
      </div>

      <div className="py-20 bg-stone-200">
        <Container>
          <div className="text-center mb-16">
            <Typography
              fontWeight="light"
              variant="h2"
              className="text-gray-900 mb-4"
              fontFamily="primary"
            >
              Professional Experience
            </Typography>
            <Typography
              variant="h6"
              className="text-gray-600 max-w-2xl mx-auto"
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
                  className="group cursor-pointer bg-stone-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ease-out border border-stone-100 hover:border-stone-200"
                  key={index}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <Typography
                        variant="h4"
                        fontWeight="normal"
                        className="text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors"
                        fontFamily="primary"
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="normal"
                        className="text-neutral-600 mb-3"
                        fontFamily="primary"
                      >
                        {project.role}
                      </Typography>
                      <Typography
                        variant="p"
                        className="text-neutral-500 text-sm mb-2"
                        fontFamily="primary"
                      >
                        {project.year}
                      </Typography>
                      {project.description && (
                        <Typography
                          variant="p"
                          className="text-neutral-600 text-sm line-clamp-2"
                          fontFamily="primary"
                        >
                          {project.description}
                        </Typography>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex gap-2">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-200 transition-all duration-300 transform group-hover:scale-105">
                        <EyeIcon className="w-5 h-5 text-stone-600 group-hover:text-stone-700" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUrlClick(project.link);
                        }}
                        className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-all duration-300 transform hover:scale-105 hover:rotate-12"
                      >
                        <ArrowTopRightOnSquareIcon className="w-5 h-5 text-stone-600 hover:text-stone-700" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
      <div className="py-20 bg-stone-100">
        <Container>
          <div className="text-center mb-16">
            <Typography
              fontWeight="light"
              variant="h2"
              className="text-neutral-900 mb-4"
              fontFamily="primary"
            >
              Freelance Projects
            </Typography>
            <Typography
              variant="h6"
              className="text-neutral-600 max-w-2xl mx-auto"
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
                  className="group cursor-pointer bg-stone-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ease-out border border-stone-100 hover:border-stone-200 "
                  key={index}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <Typography
                        variant="h4"
                        fontWeight="normal"
                        className="text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors"
                        fontFamily="primary"
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="normal"
                        className="text-neutral-600 mb-3"
                        fontFamily="primary"
                      >
                        {project.role}
                      </Typography>
                      <Typography
                        variant="p"
                        className="text-neutral-500 text-sm mb-2"
                        fontFamily="primary"
                      >
                        {project.year}
                      </Typography>
                      {project.description && (
                        <Typography
                          variant="p"
                          className="text-neutral-600 text-sm line-clamp-2"
                          fontFamily="primary"
                        >
                          {project.description}
                        </Typography>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex gap-2">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-50 transition-all duration-300 transform group-hover:scale-105 border border-stone-200">
                        <EyeIcon className="w-5 h-5 text-stone-600 group-hover:text-stone-700" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUrlClick(project.link);
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:rotate-12 border border-gray-200"
                      >
                        <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-600 hover:text-gray-700" />
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
      <div className="py-20 bg-neutral-900">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Typography
              variant="h2"
              fontWeight="light"
              className="text-stone-100 mb-6"
              fontFamily="primary"
            >
              Let's work together
            </Typography>
            <Typography
              variant="h6"
              className="text-stone-200 mb-8 leading-relaxed"
              fontFamily="primary"
              fontWeight="light"
            >
              Interested in collaborating on your next project? I'd love to hear
              about your ideas and help bring them to life.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:hello@udayvatti.com"
                className="bg-stone-50 text-neutral-900 px-8 py-4 rounded-lg font-medium hover:bg-stone-300 transition-all duration-200 inline-block"
              >
                Get in touch
              </Link>
              <Link
                href="/photography"
                className="border border-stone-600 text-white px-8 py-4 rounded-lg font-medium hover:border-stone-500 hover:bg-stone-800 transition-all duration-200 inline-block"
              >
                View photography
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
            <div className="sticky top-0 p-8 py-6 border-b border-stone-100 bg-stone-300/30 backdrop-blur-2xl ">
              <div className="absolute top-4 right-2">
                <button
                  onClick={closeModal}
                  className="bg-stone-100 text-stone-600 px-2 rounded-lg hover:bg-stone-200 transition-colors font-medium"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-y-3 items-start justify-between md:mt-8">
                <div>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    className="text-neutral-900 mb-2"
                    fontFamily="primary"
                  >
                    {selectedProject.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="text-neutral-600 mb-2"
                    fontFamily="primary"
                  >
                    {selectedProject.role}
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-neutral-500"
                    fontFamily="primary"
                  >
                    {selectedProject.year}
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUrlClick(selectedProject.link)}
                    className="bg-neutral-900 text-stone-100 px-6 py-2 rounded-lg hover:bg-neutral-800 transition-colors font-medium"
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
                  className="text-gray-900 mb-3"
                  fontFamily="primary"
                >
                  Overview
                </Typography>
                <Typography
                  variant="p"
                  className="text-gray-700 leading-relaxed"
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
                    className="text-neutral-900 mb-4"
                    fontFamily="primary"
                  >
                    Key Achievements
                  </Typography>
                  <div className="grid gap-3">
                    {selectedProject.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <Typography
                          variant="p"
                          className="text-gray-700"
                          fontFamily="primary"
                        >
                          {achievement}
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
                    className="text-gray-900 mb-4"
                    fontFamily="primary"
                  >
                    Technologies Used
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-stone-300/50 rounded-full text-sm text-neutral-700 font-medium font-mono"
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
                    className="text-gray-900 mb-2"
                    fontFamily="primary"
                  >
                    Team Collaboration
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-gray-700"
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
                    className="text-gray-900 mb-4"
                    fontFamily="primary"
                  >
                    Project Highlights
                  </Typography>
                  <div className="grid gap-3">
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <Typography
                          variant="p"
                          className="text-gray-700"
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
