"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  Handle,
  Position,
  NodeProps,
  Node,
  Edge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { CrawlNode, CrawlEdge } from "./SiteAtlasTool";
import { cn } from "@/functions/cn";

interface ReactFlowPanelProps {
  nodes: CrawlNode[];
  edges: CrawlEdge[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

const nodeWidth = 250;
const nodeHeight = 60;

const getLayoutedElements = (
  nodes: any[],
  edges: any[],
  direction = "LR" // Changed to Left-to-Right layout for cleaner path-based tree rendering
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      // Shift dagre's center to xyflow's top-left
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// Custom Node Component
function SiteNode({ data, selected }: NodeProps) {
  // Determine Gestalt color encoding based on category
  const categoryColors: Record<string, string> = {
    Marketing: "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100",
    Documentation: "border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100",
    Company: "border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-100",
    Legal: "border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100",
    "Product/App": "border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-100",
    Other: "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
  };

  const cat = (data.category as string) || "Other";
  const colorClass = categoryColors[cat] || categoryColors.Other;
  
  // Format the display name (just the last path segment instead of full title)
  let displayName = data.title as string;
  const depth = data.depth as number;
  if (depth > 0) {
    const urlObj = new URL(data.url as string);
    const segments = urlObj.pathname.split("/").filter(Boolean);
    displayName = segments[segments.length - 1] || "/";
  } else {
    displayName = new URL(data.url as string).hostname;
  }

  return (
    <div
      className={cn(
        "px-4 py-3 rounded-lg border shadow-sm transition-all min-w-[200px]",
        colorClass,
        selected && "ring-2 ring-emerald-500 shadow-md",
        !selected && "hover:brightness-95 dark:hover:brightness-110"
      )}
    >
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate font-mono">
            {displayName}
          </p>
        </div>
        <div className="flex-none bg-black/5 dark:bg-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono opacity-80">
          L{data.depth as number}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
}

const nodeTypes = {
  siteNode: SiteNode,
};

export default function ReactFlowPanel({
  nodes: rawNodes,
  edges: rawEdges,
  selectedNodeId,
  onSelectNode,
}: ReactFlowPanelProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Debounce layout: re-layout at most every 600ms during active crawl
  const [debouncedNodes, setDebouncedNodes] = useState(rawNodes);
  const [debouncedEdges, setDebouncedEdges] = useState(rawEdges);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNodes(rawNodes);
      setDebouncedEdges(rawEdges);
    }, 600);
    return () => clearTimeout(timer);
  }, [rawNodes, rawEdges]);

  useEffect(() => {
    const initialNodes = debouncedNodes.map((n) => ({
      id: n.id,
      type: "siteNode",
      data: { ...n },
      position: { x: 0, y: 0 },
    }));

    const initialEdges = debouncedEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: "smoothstep",
      animated: false,
      style: { stroke: "rgba(163, 163, 163, 0.4)", strokeWidth: 1.5 },
    }));

    if (initialNodes.length > 0) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [debouncedNodes, debouncedEdges, setNodes, setEdges]);

  // Update selection state visually
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: node.id === selectedNodeId,
      })) as Node[]
    );
  }, [selectedNodeId, setNodes]);

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      onSelectNode(node.id);
    },
    [onSelectNode]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        className="bg-neutral-50/50 dark:bg-neutral-950"
      >
        <Background color="#e5e5e5" gap={16} size={1} />
        <Controls showInteractive={false} className="border-neutral-200 dark:border-neutral-800 fill-neutral-600 dark:fill-neutral-400" />
        <MiniMap 
          nodeColor={(n) => n.selected ? '#10b981' : '#e5e5e5'}
          maskColor="rgba(0, 0, 0, 0.1)"
          className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
        />
      </ReactFlow>
    </div>
  );
}
