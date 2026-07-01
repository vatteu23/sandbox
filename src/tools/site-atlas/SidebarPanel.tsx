"use client";

import { useState } from "react";
import { cn } from "@/functions/cn";
import { ChevronRight, FileJson } from "lucide-react";
import { CrawlNode, CrawlEdge } from "./SiteAtlasTool";

interface SidebarPanelProps {
  nodes: CrawlNode[];
  edges: CrawlEdge[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
  isCrawling: boolean;
}

export default function SidebarPanel({
  nodes,
  selectedNodeId,
  onSelectNode,
  isCrawling,
}: SidebarPanelProps) {
  return (
    <div className="flex flex-col h-full font-ibm">
      <div className="flex-none px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Site Tree
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SiteTreeExplorer
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          isCrawling={isCrawling}
        />
      </div>
    </div>
  );
}

// --- Site Tree Explorer ---

function SiteTreeExplorer({
  nodes,
  selectedNodeId,
  onSelectNode,
  isCrawling,
}: {
  nodes: CrawlNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
  isCrawling: boolean;
}) {
  if (nodes.length === 0) {
    return (
      <div className="p-8 text-xs font-mono text-neutral-500 text-center leading-relaxed">
        {isCrawling ? "Building site tree..." : "Enter a URL and run Analyze to explore the site hierarchy."}
      </div>
    );
  }

  const rootNodes = nodes.filter((n) => n.depth === 0);

  return (
    <div className="p-2 space-y-0.5">
      {rootNodes.map((rootNode) => (
        <TreeNode
          key={rootNode.id}
          node={rootNode}
          allNodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          depth={0}
        />
      ))}

      {isCrawling && (
        <div className="p-3 mt-4 text-xs text-neutral-400 flex items-center gap-2 animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Mapping hierarchy...
        </div>
      )}
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Marketing: "#3b82f6",
  Documentation: "#10b981",
  Company: "#f59e0b",
  Legal: "#a855f7",
  Blog: "#ec4899",
  Products: "#06b6d4",
  Portfolio: "#f97316",
};

function TreeNode({
  node,
  allNodes,
  selectedNodeId,
  onSelectNode,
  depth,
}: {
  node: CrawlNode;
  allNodes: CrawlNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
  depth: number;
}) {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const children = allNodes.filter(
    (n) =>
      n.depth === depth + 1 &&
      n.url.startsWith(node.url + "/") &&
      n.url.replace(node.url + "/", "").indexOf("/") === -1
  );
  const hasChildren = children.length > 0;

  let displayName = node.title || node.url;
  if (depth > 0) {
    const urlObj = new URL(node.url);
    const segments = urlObj.pathname.split("/").filter(Boolean);
    displayName = segments[segments.length - 1] || "/";
  } else {
    displayName = new URL(node.url).hostname;
  }

  const isSelected = node.id === selectedNodeId;
  const catColor = node.category ? CATEGORY_COLORS[node.category] : undefined;

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-1.5 py-1 px-2 rounded-md transition-colors cursor-pointer group",
          isSelected
            ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          onSelectNode(node.id);
        }}
      >
        <div
          className={cn(
            "w-4 h-4 flex items-center justify-center transition-transform opacity-50 group-hover:opacity-100",
            isOpen && "rotate-90"
          )}
        >
          {hasChildren ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <FileJson className="w-3 h-3 ml-1" />
          )}
        </div>
        <span className={cn("text-xs truncate flex-1", isSelected ? "font-medium" : "")}>
          {displayName}
        </span>
        {catColor && node.category !== "Other" && (
          <span
            className="ml-auto flex-none w-2 h-2 rounded-full opacity-60"
            style={{ backgroundColor: catColor }}
          />
        )}
      </div>

      {isOpen && hasChildren && (
        <div className="mt-0.5 space-y-0.5">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              allNodes={allNodes}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
