import Link from "next/link";
import { graphNodeMap } from "@/data/graph/nodes";
import type { GraphNode, GraphPath } from "@/data/graph/types";

type NodePanelProps = {
  node: GraphNode | null;
  connectionReason: string | null;
  paths: GraphPath[];
  activePathId: string | null;
  onSelectNode: (id: string) => void;
  onSelectPath: (id: string) => void;
  onReset: () => void;
};

export default function NodePanel({
  node,
  connectionReason,
  paths,
  activePathId,
  onSelectNode,
  onSelectPath,
  onReset,
}: NodePanelProps) {
  if (!node) {
    return (
      <aside className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/85 dark:bg-neutral-950/80 backdrop-blur p-6 lg:p-7 xl:h-[664px] xl:overflow-y-auto">
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
          Node panel
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Select a concept to explore its perspective, related nodes, and supporting work.
        </p>
      </aside>
    );
  }

  const relatedPaths = paths.filter((path) => {
    return (
      path.startNodeId === node.id ||
      path.endNodeId === node.id ||
      path.steps.some((step) => step.nodeId === node.id)
    );
  });

  return (
    <aside className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 backdrop-blur p-6 lg:p-7 xl:h-[664px] xl:overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.18em]">
          {node.category}
        </p>
        {node.id !== "uday-vatti" && (
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      <h2 className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-4 leading-none">
        {node.title}
      </h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
        {node.summary}
      </p>

      {node.relatedNodes.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-3">
            Related concepts
          </p>
          <div className="flex flex-wrap gap-2">
            {node.relatedNodes.map((relatedId) => {
              const relatedNode = graphNodeMap[relatedId];
              if (!relatedNode) {
                return null;
              }
              return (
                <button
                  type="button"
                  key={`${node.id}-${relatedNode.id}`}
                  onClick={() => onSelectNode(relatedNode.id)}
                  className="rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors"
                >
                  {relatedNode.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 p-4">
        <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-2">
          Perspective
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
          {node.philosophy}
        </p>
      </div>

      {connectionReason && (
        <div className="mb-6">
          <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-2">
            Connection context
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {connectionReason}
          </p>
        </div>
      )}

      {node.examples.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-3">
            Supporting work
          </p>
          <div className="space-y-3">
            {node.examples.map((example) => (
              <Link
                key={`${node.id}-${example.projectId}`}
                href={example.href || "/work"}
                className="block rounded-xl border border-neutral-200 dark:border-neutral-800 p-3 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {example.title}
                </p>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                  {example.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedPaths.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-3">
            Related paths
          </p>
          <div className="space-y-3">
            {relatedPaths.slice(0, 4).map((path) => (
              <button
                type="button"
                key={path.id}
                onClick={() => onSelectPath(path.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  activePathId === path.id
                    ? "border-neutral-900 dark:border-neutral-100"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
              >
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {path.title}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {path.whyItMatters}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {node.experiments.length > 0 && (
        <div>
          <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-3">
            {node.id === "cars" ? "Dream cars" : "What I\u2019m exploring"}
          </p>
          <div className="space-y-3">
            {node.experiments.map((experiment) => (
              <div
                key={`${node.id}-${experiment.title}`}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-3"
              >
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {experiment.title}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                  {experiment.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
