import parse from "html-react-parser";
import { Freelance, PorjectProps, Porjects } from "@/data/projects";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import Link from "next/link";
import { projectConceptNarratives } from "@/data/graph/projectConcepts";
import {
  ArrowTopRightOnSquareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const allProjects = [...Porjects, ...Freelance];

function getAdjacentProjects(currentId: string) {
  const idx = allProjects.findIndex((p) => p.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? allProjects[idx - 1] : null,
    next: idx < allProjects.length - 1 ? allProjects[idx + 1] : null,
  };
}

const Work = ({ work }: { work: PorjectProps | null }) => {
  if (!work) {
    return (
      <Layout className="bg-white dark:bg-neutral-950 min-h-screen">
        <HeadWithMetas
          title="Work not found | Uday Vatti"
          description="This case study could not be found."
          noIndex
        />
        <Container className="py-40 text-center">
          <p className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
            Work not found
          </p>
          <Link
            href="/work"
            className="text-sm font-mono text-neutral-500 dark:text-neutral-400 underline"
          >
            Back to all work
          </Link>
        </Container>
      </Layout>
    );
  }

  const { prev, next } = getAdjacentProjects(work.id);
  const isCurrent = work.year?.includes("Present");
  const narrative = projectConceptNarratives[work.id];

  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen">
      <HeadWithMetas
        title={`${work.name} — ${work.role} | Uday Vatti`}
        description={work.description || `${work.role} at ${work.name}`}
        url={`https://udayvatti.com/work/${work.id}`}
        image="/images/uv-port.png"
      />
      <Container className="pt-32 pb-20 md:pt-40">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-16 uppercase tracking-widest"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          All work
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-6 pb-10 mb-16 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-3 mb-5">
              {isCurrent && (
                <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neutral-500 dark:bg-neutral-300" />
                  </span>
                  Current
                </span>
              )}
              {work.year && (
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  {work.year}
                </span>
              )}
            </div>
            <h1
              className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {work.name}
            </h1>
            <p className="text-sm font-mono text-neutral-400 dark:text-neutral-500">
              {work.role}
            </p>
            {narrative && (
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.14em] mt-4">
                Concept: {narrative.concept}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-1">
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Visit site
              <ArrowTopRightOnSquareIcon className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Two-column: main content left, sticky meta right */}
        <div className="flex flex-col md:flex-row gap-y-16 md:gap-x-16 lg:gap-24">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-16">
            {narrative ? (
              <>
                <div>
                  <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                    Concept
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-[1.0625rem]">
                    {narrative.concept}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                    Problem
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-[1.0625rem]">
                    {narrative.problem}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                    Approach
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-[1.0625rem]">
                    {narrative.approach}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                    Outcome
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-[1.0625rem]">
                    {narrative.outcome}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                  Overview
                </p>
                <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-[1.0625rem]">
                  {work.description}
                </p>
              </div>
            )}

            {/* Impact */}
            {work.highlights && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-8">
                  Impact
                </p>
                <div className="space-y-0">
                  {work.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-baseline gap-6 py-7 border-t border-neutral-100 dark:border-neutral-800 last:border-b group"
                    >
                      <span
                        className="font-display tabular-nums text-neutral-200 dark:text-neutral-800 group-hover:text-neutral-400 dark:group-hover:text-neutral-600 flex-shrink-0 leading-none select-none transition-colors duration-200"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                      >
                        {String(index + 1).padStart(2)}
                      </span>
                      <p className="text-[1.0625rem] text-neutral-700 dark:text-neutral-200 leading-[1.7] font-medium">
                        {parse(highlight)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Achievements */}
            {work.achievements && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-6">
                  Supporting work
                </p>
                <ul className="space-y-4">
                  {work.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 flex-shrink-0" />
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-7">
                        {parse(achievement)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {narrative && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                  Supporting work context
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  {narrative.supportingWork}
                </p>
              </div>
            )}
          </div>

          {/* Sticky right rail — stack + team */}
          <div className="md:sticky md:top-[90px] md:w-56 lg:w-64 h-fit flex-shrink-0 space-y-8">
            {work.technologies && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-xs text-neutral-600 dark:text-neutral-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {work.teamSize && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Team
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-mono">
                  {work.teamSize}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Project navigation */}
        <div className="mt-20 pt-10 ">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              More work
            </span>
            <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/work/${prev.id}`}
                className="group py-6 px-3 -mx-3 rounded-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-150"
              >
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                  ← Previous
                </p>
                <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100 leading-snug group-hover:translate-x-[-2px] transition-transform duration-200">
                  {prev.name}
                </p>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mt-1">
                  {prev.role}
                </p>
              </Link>
            )}
            {next && (
              <Link
                href={`/work/${next.id}`}
                className={`group py-6 px-3 -mx-3 rounded-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-150 text-right ${!prev ? "sm:col-start-2" : ""}`}
              >
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Next →
                </p>
                <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100 leading-snug group-hover:translate-x-[2px] transition-transform duration-200">
                  {next.name}
                </p>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mt-1">
                  {next.role}
                </p>
              </Link>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      ...Porjects.map((work) => ({ params: { id: work.id } })),
      ...Freelance.map((work) => ({ params: { id: work.id } })),
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const work =
    Porjects.find((w) => w.id === params.id) ||
    Freelance.find((w) => w.id === params.id) ||
    null;
  return { props: { work } };
}

export default Work;
