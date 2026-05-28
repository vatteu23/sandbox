import parse from "html-react-parser";
import { Freelance, PorjectProps, Porjects } from "..";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import { FiCalendar } from "react-icons/fi";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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
          <Link href="/work" className="text-sm font-mono text-neutral-500 dark:text-neutral-400 underline">
            Back to all work
          </Link>
        </Container>
      </Layout>
    );
  }

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

        <div className="flex flex-col md:flex-row gap-y-12 md:gap-x-6 lg:gap-16 relative">

          {/* Sidebar */}
          <div className="md:sticky md:top-[90px] w-full md:w-1/3 lg:w-1/4 h-fit rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-5 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 font-mono mb-1 leading-tight">
                {work.name}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {work.role}
              </p>
            </div>

            {work.metric && (
              <div className="px-5 py-3 bg-neutral-900 dark:bg-neutral-100 border-b border-neutral-800 dark:border-neutral-200">
                <p className="text-white dark:text-neutral-900 text-xs font-mono font-medium leading-relaxed">
                  {work.metric}
                </p>
              </div>
            )}

            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800">
              <FiCalendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {work.year}
              </p>
            </div>

            <Link
              className="group flex p-4 items-center justify-between gap-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-white dark:text-neutral-900 text-sm font-medium"
              href={work.link}
              target="_blank"
            >
              Visit Website
              <ArrowTopRightOnSquareIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Content */}
          <div className="md:w-2/3 lg:w-3/4 max-w-2xl space-y-12">

            {/* Overview */}
            <div>
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                Overview
              </p>
              <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-[1.0625rem]">
                {work.description}
              </p>
            </div>

            {/* Highlights — impact at a glance, shown before the detail */}
            {work.highlights && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-5">
                  Impact
                </p>
                <div className="grid gap-3">
                  {work.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-100 dark:border-neutral-800">
                      <span className="text-xs font-mono tabular-nums text-neutral-300 dark:text-neutral-700 flex-shrink-0 mt-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-medium">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Achievements — the detailed how */}
            {work.achievements && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-6">
                  What was built
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

            {/* Technologies */}
            {work.technologies && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs text-neutral-700 dark:text-neutral-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            {work.teamSize && (
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Team
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  {work.teamSize}
                </p>
              </div>
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
