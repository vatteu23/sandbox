import Link from "next/link";
import type { GraphPath } from "@/data/graph/types";

type ConceptPathCardProps = {
  path: GraphPath;
};

export default function ConceptPathCard({ path }: ConceptPathCardProps) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-x-8 gap-y-2 py-5 border-b border-neutral-100 dark:border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
          {path.title}
        </p>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {path.whyItMatters}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end">
        {path.evidence.map((item) => (
          <Link
            key={item.projectId}
            href={item.href}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-900 dark:text-neutral-100 underline underline-offset-[3px] decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
