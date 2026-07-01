"use client";

import { CrawlNode, CrawlEdge } from "./SiteAtlasTool";
import { cn } from "@/functions/cn";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  ChevronRight,
  BarChart,
  Link as LinkIcon,
} from "lucide-react";
import ExportBar from "../components/shared/ExportBar";
import type { ExportAction } from "../types";
import { useState } from "react";
import type { AiInsight } from "./AiPanel";

interface InsightsPanelProps {
  nodes: CrawlNode[];
  edges: CrawlEdge[];
  selectedNode: CrawlNode | null;
  isCrawling: boolean;
  aiInsight?: AiInsight | null;
}

// Category color palette — shared with graph node colors
const CATEGORY_COLORS: Record<string, string> = {
  Marketing: "#3b82f6",
  Documentation: "#10b981",
  Company: "#f59e0b",
  Legal: "#a855f7",
  Blog: "#ec4899",
  Products: "#06b6d4",
  Portfolio: "#f97316",
  Other: "#94a3b8",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "#94a3b8";
}

export default function InsightsPanel({
  nodes,
  edges,
  selectedNode,
  isCrawling,
  aiInsight,
}: InsightsPanelProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex flex-col h-full p-8 items-center justify-center text-center text-neutral-400 font-ibm">
        <BarChart className="w-8 h-8 mb-4 opacity-20" />
        <p className="text-sm">Run an analysis to view metrics.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-ibm overflow-y-auto">
      {selectedNode ? (
        <PageMetricsView node={selectedNode} />
      ) : (
        <GlobalMetricsView nodes={nodes} edges={edges} isCrawling={isCrawling} aiInsight={aiInsight} />
      )}
    </div>
  );
}

// --- Scoring Logic (IA-framed, not SEO-framed) ---

function getPageScores(node: CrawlNode) {
  // Navigation: Is this page findable? H1 presence, canonical, depth
  let nav = 100;
  if (node.headings.h1 === 0) nav -= 25;
  if (node.headings.h1 > 1) nav -= 10;
  if (!node.metadata.canonical) nav -= 15;
  if (node.depth > 3) nav -= (node.depth - 3) * 10;

  // Accessibility: Images with alt text
  let accessibility = 100 - node.accessibility.missingAltText * 15;

  // Content: Word count, heading structure
  let content = 100;
  if (node.wordCount < 300) content -= 35;
  if (node.wordCount === 0) content = 0;
  if (node.headings.h2 === 0 && node.wordCount > 500) content -= 10;

  // Structure: Orphan risk, depth appropriateness
  let structure = 100;
  if (node.depth > 3) structure -= (node.depth - 3) * 10;
  if (node.links.content.internal.length === 0 && node.depth > 0)
    structure -= 25;
  if (structure < 0) structure = 0;

  return {
    nav: Math.max(0, nav),
    accessibility: Math.max(0, accessibility),
    content: Math.max(0, content),
    structure: Math.max(0, structure),
  };
}

function getGlobalScores(nodes: CrawlNode[]) {
  if (nodes.length === 0)
    return { nav: 0, accessibility: 0, content: 0, structure: 0 };

  const scores = nodes.map(getPageScores);
  const avg = (key: keyof ReturnType<typeof getPageScores>) =>
    Math.round(scores.reduce((acc, s) => acc + s[key], 0) / nodes.length);

  return {
    nav: avg("nav"),
    accessibility: avg("accessibility"),
    content: avg("content"),
    structure: avg("structure"),
  };
}

// --- Shared Components ---

function Gauge({ score, label }: { score: number; label: string }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = "text-emerald-500";
  let bgClass = "text-emerald-500/20";
  if (score < 50) {
    colorClass = "text-rose-500";
    bgClass = "text-rose-500/20";
  } else if (score < 90) {
    colorClass = "text-amber-500";
    bgClass = "text-amber-500/20";
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg
          className="transform -rotate-90 w-full h-full"
          viewBox="0 0 64 64"
        >
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="5"
            fill="transparent"
            className={bgClass}
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn("transition-all duration-1000 ease-out", colorClass)}
          />
        </svg>
        <span
          className={cn(
            "absolute text-2xl font-mono font-medium",
            colorClass
          )}
        >
          {score}
        </span>
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function AuditItem({
  title,
  description,
  status,
  value,
}: {
  title: string;
  description?: string;
  status: "pass" | "warn" | "fail" | "info";
  value?: string;
}) {
  let Icon = Info;
  let color = "text-blue-500";
  let bgColor = "bg-blue-500/10";

  if (status === "pass") {
    Icon = CheckCircle2;
    color = "text-emerald-500";
    bgColor = "bg-emerald-500/10";
  } else if (status === "warn") {
    Icon = AlertTriangle;
    color = "text-amber-500";
    bgColor = "bg-amber-500/10";
  } else if (status === "fail") {
    Icon = XCircle;
    color = "text-rose-500";
    bgColor = "bg-rose-500/10";
  }

  return (
    <div className="flex gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800/50 last:border-0">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-none",
          bgColor
        )}
      >
        <Icon className={cn("w-4 h-4", color)} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-4">
          <h5 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {title}
          </h5>
          {value && (
            <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">
              {value}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function resolveInternalHref(link: string, pageUrl: string): string {
  if (link.startsWith("http://") || link.startsWith("https://")) return link;
  try {
    return new URL(link.startsWith("/") ? link : `/${link}`, pageUrl).toString();
  } catch {
    return link;
  }
}

function LinkList({
  title,
  links,
  resolveHref,
  emptyMessage,
  defaultOpen,
}: {
  title: string;
  links: string[];
  resolveHref?: (link: string) => string;
  emptyMessage?: string;
  defaultOpen?: boolean;
}) {
  const initialOpen = defaultOpen ?? (links.length > 0 && links.length <= 12);
  return (
    <ExpandableSection
      title={`${title} (${links.length})`}
      defaultOpen={initialOpen}
    >
      {links.length === 0 ? (
        <p className="text-xs text-neutral-500 py-2">
          {emptyMessage || "None discovered."}
        </p>
      ) : (
        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800/50 -mx-1 max-h-[280px] overflow-y-auto">
          {links.map((link) => {
            const href = resolveHref ? resolveHref(link) : link;
            const label = href;
            return (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-2.5 text-xs font-mono text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-md transition-colors group"
                >
                  <LinkIcon className="w-3 h-3 flex-none opacity-60 group-hover:opacity-100" />
                  <span className="truncate">{label || href}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </ExpandableSection>
  );
}

function ExpandableSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-[#111]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </h4>
        <ChevronRight
          className={cn(
            "w-4 h-4 text-neutral-400 transition-transform",
            isOpen && "rotate-90"
          )}
        />
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
}

// --- Section Distribution Bar ---

function SectionDistributionBar({ nodes }: { nodes: CrawlNode[] }) {
  const categories = nodes.reduce((acc, n) => {
    const cat = n.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = nodes.length;
  const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Stacked bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden w-full gap-px">
        {sorted.map(([cat, count]) => (
          <div
            key={cat}
            style={{
              width: `${(count / total) * 100}%`,
              backgroundColor: getCategoryColor(cat),
              minWidth: count > 0 ? "2px" : undefined,
            }}
            title={`${cat}: ${count} pages`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {sorted.map(([cat, count]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-none"
              style={{ backgroundColor: getCategoryColor(cat) }}
            />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {cat}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {Math.round((count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Category Depth Table ---

function CategoryDepthTable({ nodes }: { nodes: CrawlNode[] }) {
  const catDepths: Record<string, number[]> = {};
  nodes.forEach((n) => {
    const cat = n.category || "Other";
    if (!catDepths[cat]) catDepths[cat] = [];
    catDepths[cat].push(n.depth);
  });

  const rows = Object.entries(catDepths)
    .map(([cat, depths]) => ({
      cat,
      avg: depths.reduce((a, b) => a + b, 0) / depths.length,
      count: depths.length,
    }))
    .sort((a, b) => a.avg - b.avg);

  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
      {rows.map(({ cat, avg, count }) => {
        const rounded = parseFloat(avg.toFixed(1));
        const signal =
          rounded <= 1.5
            ? { label: "Surfaced", color: "text-emerald-500" }
            : rounded <= 2.5
            ? { label: "Accessible", color: "text-emerald-400" }
            : rounded <= 3.5
            ? { label: "Moderate", color: "text-amber-500" }
            : { label: "Buried", color: "text-rose-500" };

        return (
          <div
            key={cat}
            className="flex items-center gap-3 py-3 first:pt-4 last:pb-0"
          >
            <span
              className="w-2 h-2 rounded-full flex-none"
              style={{ backgroundColor: getCategoryColor(cat) }}
            />
            <span className="text-xs text-neutral-700 dark:text-neutral-300 flex-1">
              {cat}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {count}p
            </span>
            <span className="text-xs font-mono text-neutral-500 w-8 text-right">
              {rounded}
            </span>
            <span className={cn("text-[10px] font-mono uppercase w-20 text-right", signal.color)}>
              {signal.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// --- Views ---

function GlobalMetricsView({
  nodes,
  edges,
  isCrawling,
  aiInsight,
}: {
  nodes: CrawlNode[];
  edges: CrawlEdge[];
  isCrawling: boolean;
  aiInsight?: AiInsight | null;
}) {
  const scores = getGlobalScores(nodes);

  const maxDepth = Math.max(...nodes.map((n) => n.depth), 0);
  const avgDepth = (
    nodes.reduce((acc, n) => acc + n.depth, 0) / nodes.length
  ).toFixed(1);
  const missingDesc = nodes.filter(
    (n) => !n.metadata.description && n.wordCount > 0
  ).length;
  const missingH1 = nodes.filter(
    (n) => n.headings.h1 === 0 && n.wordCount > 0
  ).length;
  const multipleH1 = nodes.filter(
    (n) => n.headings.h1 > 1 && n.wordCount > 0
  ).length;
  const thinPages = nodes.filter(
    (n) => n.wordCount > 0 && n.wordCount < 300
  ).length;

  // Orphan pages: exist but have no inbound edges (excluding root)
  const linkedTargets = new Set(edges.map((e) => e.target));
  const orphans = nodes.filter((n) => n.depth > 0 && !linkedTargets.has(n.id));

  // Hub pages: highest inbound link count
  const inboundCount = edges.reduce((acc, e) => {
    acc[e.target] = (acc[e.target] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const hubs = [...nodes]
    .sort((a, b) => (inboundCount[b.id] || 0) - (inboundCount[a.id] || 0))
    .slice(0, 5);

  const exportActions: ExportAction[] = [
    {
      id: "export-json",
      label: "Export JSON",
      filename: "site-atlas-crawl.json",
      mimeType: "application/json",
      variant: "download",
      getContent: () => JSON.stringify({ nodes, edges, ...(aiInsight ? { aiAnalysis: aiInsight } : {}) }, null, 2),
    },
    {
      id: "export-csv",
      label: "Export CSV",
      filename: "site-atlas-nodes.csv",
      mimeType: "text/csv",
      variant: "download",
      getContent: () => {
        const header = ["URL", "Title", "Category", "Depth", "Word Count"].join(",");
        const rows = nodes.map(
          (n) =>
            `"${n.url}","${n.title.replace(/"/g, '""')}","${n.category || "Other"}",${n.depth},${n.wordCount}`
        );
        return [header, ...rows].join("\n");
      },
    },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-300">
      {/* Gauges */}
      <div className="flex flex-col items-center border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <h2 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-6">
          IA Audit
        </h2>
        <div className="flex items-start justify-center gap-6 md:gap-8 w-full">
          <Gauge score={scores.nav} label="Nav" />
          <Gauge score={scores.accessibility} label="A11Y" />
          <Gauge score={scores.content} label="Content" />
          <Gauge score={scores.structure} label="Structure" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Section Distribution */}
        <ExpandableSection title="Content Distribution">
          <div className="pt-4">
            <SectionDistributionBar nodes={nodes} />
          </div>
        </ExpandableSection>

        {/* Architecture Diagnostics */}
        <ExpandableSection title="Navigation & Depth">
          <AuditItem
            title="Total Pages Discovered"
            value={nodes.length.toString()}
            status="info"
          />
          <AuditItem
            title="Average Click Depth"
            value={avgDepth}
            description="Pages deeper than 3 clicks are harder for users to discover naturally."
            status={parseFloat(avgDepth) > 3 ? "warn" : "pass"}
          />
          <AuditItem
            title="Maximum Click Depth"
            value={maxDepth.toString()}
            status={maxDepth > 4 ? "warn" : "pass"}
          />
          <AuditItem
            title="Orphan Pages"
            value={orphans.length.toString()}
            description={
              orphans.length > 0
                ? "These pages exist but receive no inbound links — users can't reach them through navigation."
                : "All pages are reachable through navigation."
            }
            status={orphans.length > 0 ? "fail" : "pass"}
          />
        </ExpandableSection>

        {/* Orphan Pages List */}
        {orphans.length > 0 && (
          <ExpandableSection
            title={`Orphan Pages · ${orphans.length}`}
            defaultOpen={orphans.length <= 10}
          >
            <ul className="divide-y divide-neutral-100 dark:divide-neutral-800/50 -mx-1 max-h-[280px] overflow-y-auto pt-2">
              {orphans.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-2.5 text-xs font-mono text-rose-500 hover:text-rose-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-md transition-colors group"
                  >
                    <LinkIcon className="w-3 h-3 flex-none opacity-60" />
                    <span className="truncate">{n.url.replace(/^https?:\/\/[^/]+/, "") || "/"}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ExpandableSection>
        )}

        {/* Hub Pages */}
        <ExpandableSection title="Hub Pages · Top 5 by Inbound Links">
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
            {hubs.map((n, i) => (
              <div key={n.id} className="flex items-center gap-3 py-3 first:pt-4 last:pb-0">
                <span className="text-[10px] font-mono text-neutral-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-mono truncate block transition-colors"
                  >
                    {n.url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                  </a>
                  {n.title && (
                    <span className="text-[10px] text-neutral-400 truncate block">{n.title}</span>
                  )}
                </div>
                <span className="text-xs font-mono text-neutral-500 whitespace-nowrap">
                  {inboundCount[n.id] || 0} in
                </span>
              </div>
            ))}
          </div>
        </ExpandableSection>

        {/* Category Depth */}
        <ExpandableSection title="Avg Depth by Category">
          <CategoryDepthTable nodes={nodes} />
        </ExpandableSection>

        {/* Content & Heading Audits */}
        <ExpandableSection title="Content & Heading Audits">
          <AuditItem
            title="Pages missing H1 tags"
            value={missingH1.toString()}
            description="Every page should have a primary heading to define its topic."
            status={missingH1 > 0 ? "fail" : "pass"}
          />
          <AuditItem
            title="Pages with multiple H1 tags"
            value={multipleH1.toString()}
            description="Multiple H1s dilute the page's primary topic signal."
            status={multipleH1 > 0 ? "warn" : "pass"}
          />
          <AuditItem
            title="Pages missing meta descriptions"
            value={missingDesc.toString()}
            description="Meta descriptions help users understand a page before clicking."
            status={missingDesc > 0 ? "warn" : "pass"}
          />
          <AuditItem
            title="Thin content pages (< 300 words)"
            value={thinPages.toString()}
            description="Thin pages may not provide enough value for users to engage with."
            status={thinPages > 0 ? "warn" : "pass"}
          />
        </ExpandableSection>

        {!isCrawling && (
          <div className="pt-4">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3 px-1">
              Export Report
            </h3>
            <ExportBar
              actions={exportActions}
              className="mt-0 pt-0 border-none flex-col items-start gap-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PageMetricsView({ node }: { node: CrawlNode }) {
  const scores = getPageScores(node);
  const contentInternal = node.links.content?.internal ?? [];
  const contentExternal = node.links.content?.external ?? [];
  const navInternal = node.links.navigation?.internal ?? [];
  const navExternal = node.links.navigation?.external ?? [];

  return (
    <div key={node.id} className="p-6 space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-500">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getCategoryColor(node.category || "Other") }}
            />
            {node.category || "Uncategorized"}
          </span>
          <span className="text-[10px] font-mono text-neutral-400">
            Level {node.depth}
          </span>
        </div>
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 leading-snug">
          {node.title}
        </h2>
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 font-mono truncate block"
        >
          {node.url}
        </a>
      </div>

      <div className="flex items-start justify-center gap-6 w-full py-2">
        <Gauge score={scores.nav} label="Nav" />
        <Gauge score={scores.accessibility} label="A11Y" />
        <Gauge score={scores.content} label="Content" />
        <Gauge score={scores.structure} label="Structure" />
      </div>

      <div className="space-y-4">
        <ExpandableSection title="Findability Audits">
          <AuditItem
            title="Primary Heading (H1)"
            value={
              node.headings.h1 === 1
                ? "Present"
                : node.headings.h1 === 0
                ? "Missing"
                : "Multiple"
            }
            status={
              node.headings.h1 === 1
                ? "pass"
                : node.headings.h1 === 0
                ? "fail"
                : "warn"
            }
          />
          <AuditItem
            title="Meta Description"
            value={node.metadata.description ? "Present" : "Missing"}
            description={node.metadata.description}
            status={node.metadata.description ? "pass" : "fail"}
          />
          <AuditItem
            title="Canonical URL"
            value={node.metadata.canonical ? "Present" : "Missing"}
            description={node.metadata.canonical}
            status={node.metadata.canonical ? "pass" : "warn"}
          />
          <AuditItem
            title="Click Depth"
            value={`Level ${node.depth}`}
            description={
              node.depth > 3
                ? "Deeply buried — hard to reach naturally."
                : "Easily discoverable from the homepage."
            }
            status={node.depth > 3 ? "warn" : "pass"}
          />
        </ExpandableSection>

        <ExpandableSection title="Content & Accessibility">
          <AuditItem
            title="Word Count"
            value={node.wordCount.toLocaleString()}
            description={
              node.wordCount < 300
                ? "Thin content — consider expanding."
                : "Good content length."
            }
            status={node.wordCount < 300 ? "warn" : "pass"}
          />
          <AuditItem
            title="Images missing Alt Text"
            value={node.accessibility.missingAltText.toString()}
            status={node.accessibility.missingAltText === 0 ? "pass" : "fail"}
          />
        </ExpandableSection>

        <ExpandableSection title="Structure & Linking">
          <AuditItem
            title="Content Internal Links"
            value={contentInternal.length.toString()}
            description="Links in the page body, not global navigation."
            status={contentInternal.length > 0 ? "pass" : "warn"}
          />
          <AuditItem
            title="Content External Links"
            value={contentExternal.length.toString()}
            status="info"
          />
          <AuditItem
            title="Navigation Internal Links"
            value={navInternal.length.toString()}
            description="Header, nav, and footer links shared across templates."
            status="info"
          />
        </ExpandableSection>

        <LinkList
          title="Content · Internal Links"
          links={contentInternal}
          resolveHref={(link) => resolveInternalHref(link, node.url)}
          emptyMessage="No in-content internal links on this page."
        />

        <LinkList
          title="Content · External Links"
          links={contentExternal}
          emptyMessage="No in-content external links on this page."
        />

        <LinkList
          title="Navigation · Internal Links"
          links={navInternal}
          resolveHref={(link) => resolveInternalHref(link, node.url)}
          emptyMessage="No navigation internal links on this page."
          defaultOpen={false}
        />

        <LinkList
          title="Navigation · External Links"
          links={navExternal}
          emptyMessage="No navigation external links on this page."
          defaultOpen={false}
        />
      </div>
    </div>
  );
}
