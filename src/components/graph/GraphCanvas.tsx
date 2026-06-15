"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { densityByBreakpoint } from "@/data/graph/density";
import type { GraphEdge, GraphNode } from "@/data/graph/types";

type GraphMode = "guided" | "explore";

type GraphCanvasProps = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedId: string;
  focusNodeId: string;
  mode: GraphMode;
  isMobile: boolean;
  showPractices: boolean;
  showEvidence: boolean;
  onEnterExplore: () => void;
  onTogglePractices: () => void;
  onToggleEvidence: () => void;
  onSelect: (id: string) => void;
  onConnectionPreview: (reason: string | null) => void;
};

type Viewport = {
  x: number;
  y: number;
  scale: number;
};

const categoryStyles: Record<GraphNode["category"], string> = {
  identity: "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900",
  domain: "border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
  practice: "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
  evidence: "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
};

export default function GraphCanvas({
  nodes,
  edges,
  selectedId,
  focusNodeId,
  mode,
  isMobile,
  showPractices,
  showEvidence,
  onEnterExplore,
  onTogglePractices,
  onToggleEvidence,
  onSelect,
  onConnectionPreview,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; dragging: boolean }>({
    x: 0,
    y: 0,
    dragging: false,
  });
  const [viewport, setViewport] = useState<Viewport>({ x: 600, y: 460, scale: 1 });
  const isGuided = mode === "guided";

  const selectedNode = nodes.find((node) => node.id === selectedId);

  const densityPreset = useMemo(() => {
    if (isMobile) {
      return densityByBreakpoint.mobile;
    }
    if (typeof window !== "undefined" && window.innerWidth < 1200) {
      return densityByBreakpoint.tablet;
    }
    return densityByBreakpoint.desktop;
  }, [isMobile]);

  const visibleBaseNodes = useMemo(() => {
    const primaryNodes = nodes.filter(
      (node) => node.category === "identity" || node.category === "domain",
    );
    const practiceNodes = nodes.filter((node) => node.category === "practice");

    const relatedSet = new Set<string>();
    edges.forEach((edge) => {
      if (edge.source === selectedId) {
        relatedSet.add(edge.target);
      }
      if (edge.target === selectedId) {
        relatedSet.add(edge.source);
      }
    });
    relatedSet.add(selectedId);

    const baseCandidates = [
      ...primaryNodes,
      ...(showPractices ? practiceNodes : []),
    ];

    const prioritized = baseCandidates.sort((a, b) => {
      const score = (node: GraphNode) =>
        node.id === selectedId ? 100 :
        relatedSet.has(node.id) ? 60 :
        node.category === "identity" ? 40 : 20;
      return score(b) - score(a);
    });

    const slice = prioritized.slice(0, densityPreset.maxNodes);
    if (!slice.some((node) => node.id === selectedId)) {
      const selected = nodes.find((node) => node.id === selectedId);
      if (selected) {
        slice[slice.length - 1] = selected;
      }
    }
    return slice;
  }, [densityPreset.maxNodes, edges, nodes, selectedId, showPractices]);

  const evidenceNodes = useMemo(() => {
    if (!showEvidence || !selectedNode || !selectedNode.examples.length) {
      return [];
    }

    const budget = isMobile ? 2 : 4;
    return selectedNode.examples.slice(0, budget).map((example, index) => {
      const angle = (index / Math.max(1, budget)) * Math.PI * 1.2 - Math.PI * 0.6;
      const radius = 180;
      return {
        id: `evidence-${example.projectId}`,
        title: example.title,
        category: "evidence" as const,
        position: {
          x: selectedNode.position.x + Math.cos(angle) * radius,
          y: selectedNode.position.y + Math.sin(angle) * radius + 120,
        },
        href: example.href || "/work",
      };
    });
  }, [isMobile, selectedNode, showEvidence]);

  const visibleNodes = useMemo(() => {
    return [...visibleBaseNodes, ...evidenceNodes];
  }, [evidenceNodes, visibleBaseNodes]);

  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));

  const visibleEdges = useMemo(() => {
    const filteredBaseEdges = edges
      .filter((edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target))
      .slice(0, densityPreset.maxEdges);

    const evidenceEdges = evidenceNodes.map((node) => ({
      id: `edge-${selectedId}-${node.id}`,
      source: selectedId,
      target: node.id,
      reason: "Supporting evidence linked to this concept",
    }));

    return [...filteredBaseEdges, ...evidenceEdges];
  }, [densityPreset.maxEdges, edges, evidenceNodes, selectedId, visibleNodeIds]);

  const centerOnNode = (nodeId: string) => {
    const node = visibleBaseNodes.find((entry) => entry.id === nodeId) || nodes.find((entry) => entry.id === nodeId);
    const container = containerRef.current;
    if (!node || !container) {
      return;
    }
    const scale = isGuided ? (isMobile ? 0.82 : 0.95) : viewport.scale;
    const x = container.clientWidth / 2 - node.position.x * scale;
    const y = container.clientHeight / 2 - node.position.y * scale;
    setViewport({ x, y, scale });
  };

  useEffect(() => {
    centerOnNode(focusNodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusNodeId, isGuided, isMobile, showPractices, showEvidence]);

  const relatedIds = useMemo(() => {
    const set = new Set<string>();
    set.add(selectedId);
    visibleEdges.forEach((edge) => {
      if (edge.source === selectedId) {
        set.add(edge.target);
      }
      if (edge.target === selectedId) {
        set.add(edge.source);
      }
    });
    return set;
  }, [selectedId, visibleEdges]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isGuided) {
      return;
    }
    event.preventDefault();
    const nextScale = Math.min(1.8, Math.max(0.55, viewport.scale - event.deltaY * 0.0012));
    setViewport((prev) => ({ ...prev, scale: nextScale }));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isGuided) {
      return;
    }
    if ((event.target as HTMLElement).closest("[data-graph-node]")) {
      return;
    }
    dragRef.current.dragging = true;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) {
      return;
    }

    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;

    setViewport((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.dragging = false;
    if ((event.target as HTMLDivElement).hasPointerCapture(event.pointerId)) {
      (event.target as HTMLDivElement).releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 border-b border-neutral-100 dark:border-neutral-900 gap-2 overflow-x-auto">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 flex-shrink-0 hidden md:block">
          {isGuided ? "Guided map" : "Knowledge graph"}
        </p>
        <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onTogglePractices}
            className={`px-2 md:px-2.5 h-7 rounded-full border text-[9px] md:text-[10px] font-mono uppercase tracking-[0.14em] md:tracking-[0.16em] flex-shrink-0 ${
              showPractices
                ? "border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                : "border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
            }`}
          >
            Practices
          </button>
          <button
            type="button"
            onClick={onToggleEvidence}
            className={`px-2 md:px-2.5 h-7 rounded-full border text-[9px] md:text-[10px] font-mono uppercase tracking-[0.14em] md:tracking-[0.16em] flex-shrink-0 ${
              showEvidence
                ? "border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                : "border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
            }`}
          >
            Evidence
          </button>
          <button
            type="button"
            disabled={isGuided}
            onClick={() => setViewport((prev) => ({ ...prev, scale: Math.min(1.8, prev.scale + 0.1) }))}
            className="h-7 w-7 rounded-full border border-neutral-200 disabled:opacity-40 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm flex-shrink-0"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            disabled={isGuided}
            onClick={() => setViewport((prev) => ({ ...prev, scale: Math.max(0.55, prev.scale - 0.1) }))}
            className="h-7 w-7 rounded-full border border-neutral-200 disabled:opacity-40 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm flex-shrink-0"
            aria-label="Zoom out"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => centerOnNode(focusNodeId)}
            className="px-2 md:px-2.5 h-7 rounded-full border border-neutral-200 dark:border-neutral-700 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.14em] md:tracking-[0.16em] text-neutral-500 dark:text-neutral-400 flex-shrink-0"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`relative h-[560px] md:h-[620px] overflow-hidden graph-bg ${
          isGuided ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        }`}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`,
          }}
        >
          <svg className="absolute inset-0 overflow-visible pointer-events-none" aria-hidden="true">
            {visibleEdges.map((edge) => {
              const source = visibleNodes.find((node) => node.id === edge.source);
              const target = visibleNodes.find((node) => node.id === edge.target);
              if (!source || !target) {
                return null;
              }

              const sourceX = source.position.x;
              const sourceY = source.position.y;
              const targetX = target.position.x;
              const targetY = target.position.y;

              const highlighted = edge.source === selectedId || edge.target === selectedId;

              return (
                <line
                  key={edge.id}
                  x1={sourceX}
                  y1={sourceY}
                  x2={targetX}
                  y2={targetY}
                  stroke={highlighted ? "currentColor" : "currentColor"}
                  className={
                    highlighted
                      ? "text-neutral-500 dark:text-neutral-300 opacity-100"
                      : "text-neutral-300 dark:text-neutral-700 opacity-60"
                  }
                  strokeWidth={highlighted ? 1.8 : 1}
                />
              );
            })}
          </svg>

          {visibleNodes.map((node) => {
            const isSelected = node.id === selectedId;
            const isVisible = relatedIds.has(node.id);
            const isEvidence = node.category === "evidence";
            if (isEvidence && "href" in node) {
              return (
                <Link
                  href={node.href}
                  key={node.id}
                  className={[
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-mono uppercase tracking-[0.14em] transition-all duration-200",
                    categoryStyles[node.category],
                    "hover:border-neutral-500 dark:hover:border-neutral-400",
                  ].join(" ")}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                  }}
                >
                  {node.title}
                </Link>
              );
            }
            return (
              <button
                type="button"
                key={node.id}
                data-graph-node
                onMouseEnter={() => {
                  if (node.id === selectedId) {
                    onConnectionPreview(null);
                    return;
                  }
                  const relationship = visibleEdges.find((edge) => {
                    return (
                      (edge.source === selectedId && edge.target === node.id) ||
                      (edge.target === selectedId && edge.source === node.id)
                    );
                  });
                  onConnectionPreview(relationship?.reason || null);
                }}
                onMouseLeave={() => onConnectionPreview(null)}
                onFocus={() => {
                  const relationship = visibleEdges.find((edge) => {
                    return (
                      (edge.source === selectedId && edge.target === node.id) ||
                      (edge.target === selectedId && edge.source === node.id)
                    );
                  });
                  onConnectionPreview(relationship?.reason || null);
                }}
                onBlur={() => onConnectionPreview(null)}
                onClick={() => onSelect(node.id)}
                className={[
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-mono uppercase tracking-[0.14em] transition-all duration-200",
                  categoryStyles[node.category],
                  isSelected
                    ? "ring-2 ring-neutral-900 dark:ring-neutral-100"
                    : "",
                  !isSelected && !isVisible
                    ? "opacity-45"
                    : "opacity-100",
                ].join(" ")}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                }}
                aria-label={`Select ${node.title}`}
              >
                {node.title}
              </button>
            );
          })}
        </div>

        {isGuided && (
          <div className="absolute left-4 right-4 bottom-4 z-20 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/92 dark:bg-neutral-950/92 p-3 flex flex-col gap-3 md:hidden">
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Guided mode keeps Identity anchored so you can explore without losing context.
            </p>
            <button
              type="button"
              onClick={onEnterExplore}
              className="h-9 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[10px] font-mono uppercase tracking-[0.16em]"
            >
              Explore graph
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
