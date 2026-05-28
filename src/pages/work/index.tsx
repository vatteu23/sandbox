import Container from "@/components/Container";
import Layout from "@/components/Layout";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import ProjectRow from "@/components/ProjectRow";
import { Freelance, Porjects } from "..";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiFigma,
  SiStorybook,
  SiGooglecloud,
  SiFramer,
  SiFirebase,
  SiD3Dotjs,
  SiJavascript,
  SiBootstrap,
  SiContentful,
  SiDotnet,
  SiGreensock,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

type SkillItem = {
  name: string;
  icon?: IconType;
};

const ALL_SKILLS: SkillItem[] = [
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Figma", icon: SiFigma },
  { name: "GSAP", icon: SiGreensock },
  { name: "Framer Motion", icon: SiFramer },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Storybook", icon: SiStorybook },
  { name: "GCP", icon: SiGooglecloud },
  { name: "Sanity CMS" },
  { name: "Firebase", icon: SiFirebase },
  { name: "D3.js", icon: SiD3Dotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Bootstrap", icon: SiBootstrap },
  { name: "Contentful", icon: SiContentful },
  { name: ".NET", icon: SiDotnet },
  { name: "Vercel", icon: SiVercel },
  { name: "SQL" },
  { name: "BigQuery" },
  { name: "C#" },
];

const allProjects = [...Porjects, ...Freelance];

export default function WorkIndex() {
  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen">
      <HeadWithMetas
        title="Work | Uday Vatti"
        description="Case studies and projects by Uday Vatti — design systems, full-stack platforms, and product engineering at Labelbox and beyond."
        url="https://udayvatti.com/work"
        image="/images/uv-port.png"
      />

      <div className="pt-32 pb-20 md:pt-40 md:pb-24">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-8">
              Selected Work
            </p>
            <h1
              className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Work
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              Design engineering across marketing platforms, data visualization
              products, e-commerce, and creative agency sites.
            </p>
          </div>
        </Container>

        {/* Skills marquee — container width, faded ends */}
        <Container>
          <div className="mt-16 border-y border-neutral-100 dark:border-neutral-900 py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="flex animate-[marquee_50s_linear_infinite] gap-10 w-max">
              {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-neutral-500  flex-shrink-0"
                  >
                    {Icon && (
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span className="text-xs font-mono whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>

        <Container className="pt-20">
          <div className="max-w-4xl">
            {/* All work roster */}
            <div className="flex items-center gap-4 mb-12">
              <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                All Work
              </span>
              <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
            </div>
            {allProjects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </div>
        </Container>
      </div>

      <Footer />
    </Layout>
  );
}
