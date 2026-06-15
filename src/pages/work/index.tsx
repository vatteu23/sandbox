import Container from "@/components/Container";
import Layout from "@/components/Layout";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Freelance, Porjects } from "@/data/projects";
import ConceptPathCard from "@/components/graph/ConceptPathCard";
import { graphPaths } from "@/data/graph/paths";

export default function WorkIndex() {
  const allProjects = [...Porjects, ...Freelance];
  const conceptGroups = [
    {
      id: "systems",
      label: "Systems Thinking",
      summary:
        "How design systems, frontend architecture, and developer workflows connect in shipping environments.",
      projectIds: ["labelbox", "tcp"],
    },
    {
      id: "brand",
      label: "Brand + Motion Systems",
      summary:
        "Brand expression becomes durable when motion and content systems are designed as reusable structure.",
      projectIds: ["them-design-studios"],
    },
    {
      id: "interaction",
      label: "Interaction + Accessibility",
      summary:
        "Interaction quality is evaluated through clarity, operability, and how complex information becomes explorable.",
      projectIds: ["cgs", "earthbound-adventures"],
    },
  ] as const;

  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen">
      <HeadWithMetas
        title="Work | Uday Vatti"
        description="Selected projects and case studies from my work in design systems, frontend architecture, and product engineering."
        url="https://udayvatti.com/work"
        image="/images/uv-port.png"
      />

      <div className="pt-32 pb-20 md:pt-40 md:pb-24">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-8">
              Work
            </p>
            <h1
              className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Work
            </h1>
            <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              A selection of projects where I owned design engineering end-to-end
              — from systems and architecture decisions through to shipped, measurable outcomes.
            </p>
          </div>
        </Container>

        {conceptGroups.map((group) => {
          const scopedProjects = group.projectIds
            .map((projectId) => allProjects.find((project) => project.id === projectId))
            .filter((project): project is (typeof allProjects)[number] => project !== undefined);

          return (
            <div
              key={group.id}
              className="mt-16"
            >
              <Container className="pb-10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {scopedProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      fluid
                    />
                  ))}
                </div>
              </Container>
            </div>
          );
        })}

        <div className="border-t border-neutral-100 dark:border-neutral-900 mt-16">
          <Container className="py-16">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                How I think about this work
              </span>
              <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
            </div>
            <div>
              {graphPaths.map((path) => (
                <ConceptPathCard key={path.id} path={path} />
              ))}
            </div>
          </Container>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}
