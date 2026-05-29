import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { PorjectProps } from "@/pages/index";

type ProjectRowProps = {
  project: PorjectProps;
  index: number;
};

const ProjectRow: React.FC<ProjectRowProps> = ({ project, index }) => (
  <div className="group relative border-b border-neutral-100 dark:border-neutral-800 first:border-t first:border-neutral-100 first:dark:border-neutral-800">
    {/* Stretched link — covers entire row */}
    <Link
      href={`/work/${project.id}`}
      className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100"
      aria-label={`View ${project.name} case study`}
    />
    <div className="pointer-events-none flex items-center gap-4 md:gap-6 py-5 px-3 -mx-3 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900 transition-colors duration-150 rounded-sm">
      {/* Index number */}
      <span className="w-6 flex-shrink-0 text-right text-xs font-mono tabular-nums text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-500 transition-colors duration-150">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Name + role */}
      <span className="flex-1 min-w-0 group-hover:translate-x-0.5 transition-transform duration-200 ease-out">
        <span className="text-base md:text-lg font-medium text-neutral-900 dark:text-neutral-100 block leading-snug">
          {project.name}
        </span>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mt-0.5 block">
          {project.role}
        </span>
      </span>

      {/* Metric badge — reveals on hover */}
      {project.metric && (
        <span className="hidden md:inline-flex flex-shrink-0 text-xs font-mono bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.metric}
        </span>
      )}

      {/* Year */}
      {project.year && (
        <span className="flex-shrink-0 text-xs font-mono text-neutral-400 dark:text-neutral-500 whitespace-nowrap px-2 py-0.5 rounded-sm">
          {project.year}
        </span>
      )}

      {/* External link button — z-20 above the stretched Link */}
      <div className="relative z-20 pointer-events-auto flex-shrink-0">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} website`}
          className="w-7 h-7 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:bg-neutral-900 dark:hover:bg-neutral-100 hover:text-white dark:hover:text-neutral-900 hover:border-neutral-900 dark:hover:border-neutral-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ArrowTopRightOnSquareIcon className="w-3 h-3" />
        </a>
      </div>
    </div>
  </div>
);

export default ProjectRow;
