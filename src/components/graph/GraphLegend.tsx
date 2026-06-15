import type { GraphNodeCategory } from "@/data/graph/types";

const labels: Record<GraphNodeCategory, string> = {
  identity: "Identity",
  domain: "Domain",
  practice: "Practice",
  evidence: "Evidence",
};

const tones: Record<GraphNodeCategory, string> = {
  identity: "bg-neutral-900 dark:bg-neutral-100",
  domain: "bg-neutral-600 dark:bg-neutral-300",
  practice: "bg-neutral-400 dark:bg-neutral-500",
  evidence: "bg-neutral-300 dark:bg-neutral-700",
};

type GraphLegendProps = {
  categories: GraphNodeCategory[];
};

export default function GraphLegend({ categories }: GraphLegendProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {categories.map((category) => (
        <div key={category} className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${tones[category]}`} />
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
            {labels[category]}
          </span>
        </div>
      ))}
    </div>
  );
}
