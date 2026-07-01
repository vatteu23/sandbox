"use client";

import { useState, useRef } from "react";
import { cn } from "@/functions/cn";
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { CrawlNode, CrawlEdge } from "./SiteAtlasTool";

// --- Types ---

interface AiStrength {
  title: string;
  detail: string;
}

interface AiIssue {
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  affectedCount?: number;
}

interface AiRecommendation {
  priority: number;
  title: string;
  detail: string;
  impact: "high" | "medium" | "low";
}

type IntelligenceVerdict = "yes" | "partial" | "no";

interface IntelligenceCheck {
  verdict: IntelligenceVerdict;
  detail: string;
}

export interface ArchitectureIntelligence {
  navigationScalable: IntelligenceCheck;
  contentFindable: IntelligenceCheck;
  overloadedSections: IntelligenceCheck;
  misfitPages: IntelligenceCheck;
  docsDiscoverable: IntelligenceCheck;
  marketingOvershadowing: IntelligenceCheck;
  redundantPaths: IntelligenceCheck;
  optimizedForGrowth: IntelligenceCheck;
}

export interface AiInsight {
  siteType: string;
  siteTypeConfidence: "high" | "medium";
  narrative: string;
  strengths: AiStrength[];
  issues: AiIssue[];
  recommendations: AiRecommendation[];
  architectureIntelligence?: ArchitectureIntelligence;
}

interface AiPanelProps {
  nodes: CrawlNode[];
  edges: CrawlEdge[];
  isOpen: boolean;
  onClose: () => void;
  /** Controlled insight — lifted to parent so export can include it */
  insight: AiInsight | null;
  onInsightChange: (insight: AiInsight | null) => void;
  /** Called with the current panel height so the parent can adjust padding */
  onHeightChange?: (height: number) => void;
}

const DEFAULT_HEIGHT = 480;
const MIN_HEIGHT = 180;

function getMaxHeight() {
  if (typeof window === "undefined") return 700;
  return Math.round(window.innerHeight * 0.9);
}

// --- Insight sub-components ---

function InsightSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-0"
      >
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {title}
        </span>
        <ChevronRight
          className={cn(
            "w-3.5 h-3.5 text-neutral-300 transition-transform",
            open && "rotate-90"
          )}
        />
      </button>
      {open && children}
    </div>
  );
}

function SiteTypeBadge({ insight }: { insight: AiInsight }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300">
        {insight.siteType}
      </span>
      <span
        className={cn(
          "text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full",
          insight.siteTypeConfidence === "high"
            ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
            : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
        )}
      >
        {insight.siteTypeConfidence} confidence
      </span>
    </div>
  );
}

function NarrativeCard({ insight }: { insight: AiInsight }) {
  return (
    <div className="space-y-3">
      <SiteTypeBadge insight={insight} />
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-2 border-neutral-200 dark:border-neutral-700 pl-3">
        {insight.narrative}
      </p>
      {insight.strengths.length > 0 && (
        <InsightSection title={`Strengths · ${insight.strengths.length}`}>
          <div className="space-y-2 pt-2">
            {insight.strengths.map((s, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-none mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {s.title}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InsightSection>
      )}
    </div>
  );
}

function IssuesCard({ insight }: { insight: AiInsight }) {
  if (insight.issues.length === 0) return null;
  const sorted = [...insight.issues].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return (order[a.severity] ?? 3) - (order[b.severity] ?? 3);
  });

  return (
    <InsightSection title={`Issues · ${sorted.length}`}>
      <div className="space-y-2 pt-2">
        {sorted.map((issue, i) => {
          const sev = issue.severity as "high" | "medium" | "low";
          const cfg = {
            high: {
              Icon: XCircle,
              border: "border-rose-200 dark:border-rose-900/50",
              bg: "bg-rose-50/50 dark:bg-rose-950/20",
              icon: "text-rose-500",
              badge:
                "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400",
            },
            medium: {
              Icon: AlertTriangle,
              border: "border-amber-200 dark:border-amber-900/50",
              bg: "bg-amber-50/50 dark:bg-amber-950/20",
              icon: "text-amber-500",
              badge:
                "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
            },
            low: {
              Icon: AlertTriangle,
              border: "border-neutral-200 dark:border-neutral-800",
              bg: "bg-neutral-50/50 dark:bg-neutral-900/20",
              icon: "text-neutral-400",
              badge:
                "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400",
            },
          }[sev];

          return (
            <div
              key={i}
              className={cn("flex gap-3 p-3 rounded-lg border", cfg.border, cfg.bg)}
            >
              <cfg.Icon
                className={cn("w-4 h-4 flex-none mt-0.5", cfg.icon)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {issue.title}
                  </p>
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full",
                      cfg.badge
                    )}
                  >
                    {sev}
                  </span>
                  {issue.affectedCount != null && issue.affectedCount > 0 && (
                    <span className="text-[10px] font-mono text-neutral-400">
                      {issue.affectedCount} pages
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {issue.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </InsightSection>
  );
}

function RecommendationsCard({ insight }: { insight: AiInsight }) {
  if (insight.recommendations.length === 0) return null;
  const sorted = [...insight.recommendations].sort(
    (a, b) => a.priority - b.priority
  );

  return (
    <InsightSection title={`Recommendations · ${sorted.length}`}>
      <div className="space-y-2 pt-2">
        {sorted.map((rec, i) => {
          const impactCfg = {
            high: "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400",
            medium:
              "bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400",
            low: "bg-neutral-100 dark:bg-neutral-800 text-neutral-500",
          }[rec.impact as "high" | "medium" | "low"] ??
            "bg-neutral-100 dark:bg-neutral-800 text-neutral-500";

          return (
            <div
              key={i}
              className="flex gap-3 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/30"
            >
              <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-mono text-neutral-500 flex-none mt-0.5">
                {String(rec.priority).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {rec.title}
                  </p>
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full",
                      impactCfg
                    )}
                  >
                    {rec.impact} impact
                  </span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {rec.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </InsightSection>
  );
}

// --- Architecture Intelligence ---

const INTELLIGENCE_LABELS: Record<keyof ArchitectureIntelligence, string> = {
  navigationScalable: "Is the navigation scalable?",
  contentFindable: "Are users likely to find content?",
  overloadedSections: "Which sections are overloaded?",
  misfitPages: "Which pages don't belong?",
  docsDiscoverable: "Is documentation discoverable?",
  marketingOvershadowing: "Is marketing overshadowing product?",
  redundantPaths: "Are there redundant paths?",
  optimizedForGrowth: "Is the website optimized for growth?",
};

const VERDICT_CONFIG: Record<
  IntelligenceVerdict,
  { label: string; dotClass: string; badgeClass: string; textClass: string }
> = {
  yes: {
    label: "YES",
    dotClass: "bg-emerald-500",
    badgeClass:
      "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
    textClass: "text-emerald-600 dark:text-emerald-400",
  },
  partial: {
    label: "PARTIAL",
    dotClass: "bg-amber-400",
    badgeClass:
      "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  no: {
    label: "NO",
    dotClass: "bg-rose-500",
    badgeClass:
      "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800",
    textClass: "text-rose-600 dark:text-rose-400",
  },
};

function IntelligenceCard({
  questionKey,
  check,
}: {
  questionKey: keyof ArchitectureIntelligence;
  check: IntelligenceCheck;
}) {
  const verdict = (check.verdict ?? "partial") as IntelligenceVerdict;
  const cfg = VERDICT_CONFIG[verdict] ?? VERDICT_CONFIG.partial;
  const label = INTELLIGENCE_LABELS[questionKey];

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-3 rounded-lg border",
        cfg.badgeClass
      )}
    >
      <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 leading-tight">
        {label}
      </p>
      <p className={cn("text-base font-mono font-semibold tracking-tight", cfg.textClass)}>
        {cfg.label}
      </p>
      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {check.detail}
      </p>
    </div>
  );
}

function ArchitectureIntelligenceView({
  intelligence,
}: {
  intelligence: ArchitectureIntelligence;
}) {
  const keys = Object.keys(INTELLIGENCE_LABELS) as (keyof ArchitectureIntelligence)[];

  const passCount = keys.filter((k) => {
    const v = intelligence[k]?.verdict as IntelligenceVerdict | undefined;
    return v === "yes";
  }).length;

  return (
    <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto">
      {/* Summary bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
          {passCount} / {keys.length} checks passed
        </span>
        <div className="flex items-center gap-1.5">
          {keys.map((k) => {
            const v = (intelligence[k]?.verdict ?? "partial") as IntelligenceVerdict;
            const cfg = VERDICT_CONFIG[v] ?? VERDICT_CONFIG.partial;
            return (
              <span
                key={k}
                title={INTELLIGENCE_LABELS[k]}
                className={cn("w-2.5 h-2.5 rounded-full", cfg.dotClass)}
              />
            );
          })}
        </div>
      </div>

      {/* 4×2 card grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {keys.map((k) => (
          <IntelligenceCard key={k} questionKey={k} check={intelligence[k]} />
        ))}
      </div>
    </div>
  );
}

// --- Main AiPanel ---

export default function AiPanel({
  nodes,
  edges,
  isOpen,
  onClose,
  insight,
  onInsightChange,
  onHeightChange,
}: AiPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [panelHeight, setPanelHeight] = useState(DEFAULT_HEIGHT);
  const [activeTab, setActiveTab] = useState<"analysis" | "intelligence">("analysis");
  const isDragging = useRef(false);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze-architecture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onInsightChange(data as AiInsight);
    } catch (err: any) {
      setError(err.message || "Failed to generate AI insights.");
    } finally {
      setLoading(false);
    }
  };

  // --- Drag to resize ---
  function onHandlePointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onHandlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const newH = Math.round(window.innerHeight - e.clientY);
    const clamped = Math.min(Math.max(newH, MIN_HEIGHT), getMaxHeight());
    setPanelHeight(clamped);
    onHeightChange?.(clamped);
  }

  function onHandlePointerUp(e: React.PointerEvent) {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 flex flex-col font-ibm",
        "bg-white dark:bg-[#111] border-t border-neutral-200 dark:border-neutral-800",
        "shadow-[0_-4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}
      style={{ height: panelHeight }}
    >
      {/* Drag handle */}
      <div
        className="flex-none flex items-center justify-center h-5 cursor-ns-resize select-none group"
        onPointerDown={onHandlePointerDown}
        onPointerMove={onHandlePointerMove}
        onPointerUp={onHandlePointerUp}
      >
        <div className="w-8 h-1 rounded-full bg-neutral-200 dark:bg-neutral-700 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600 transition-colors" />
      </div>

      {/* Panel header */}
      <div className="flex-none border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between px-5 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neutral-400" />
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-ibm">
              AI Analysis
            </h3>
            {insight && (
              <span className="text-[10px] font-mono text-neutral-400 ml-1">
                · {nodes.length} pages analyzed
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {insight && (
              <button
                onClick={runAnalysis}
                disabled={loading}
                className="text-[10px] font-mono text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors disabled:opacity-40"
              >
                {loading ? "Re-analyzing..." : "Re-run"}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab bar — only when analysis has run */}
        {insight && (
          <div className="flex items-center gap-0 px-5 -mb-px">
            {(["analysis", "intelligence"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 text-[11px] font-mono uppercase tracking-widest border-b-2 transition-colors",
                  activeTab === tab
                    ? "border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                    : "border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                )}
              >
                {tab === "analysis" ? "Analysis" : "Intelligence"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto font-ibm">
        {!insight ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
            <Sparkles className="w-8 h-8 text-neutral-200 dark:text-neutral-700" />
            <div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Analyze your site architecture with AI
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                Detects site type, explains what the architecture communicates, surfaces structural issues, and gives prioritized IA recommendations.
              </p>
            </div>
            {error && (
              <p className="text-xs text-rose-500 p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-900 max-w-sm">
                {error}
              </p>
            )}
            <button
              onClick={runAnalysis}
              disabled={loading || nodes.length === 0}
              className="flex items-center gap-2 px-5 py-2.5
                bg-neutral-950 dark:bg-neutral-100
                text-white dark:text-neutral-900
                text-sm font-medium rounded-full
                hover:bg-neutral-800 dark:hover:bg-white
                transition-colors disabled:opacity-40 shadow-sm"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing structure...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Run Analysis
                </>
              )}
            </button>
          </div>
        ) : activeTab === "intelligence" && insight.architectureIntelligence ? (
          <ArchitectureIntelligenceView intelligence={insight.architectureIntelligence} />
        ) : activeTab === "intelligence" ? (
          /* Intelligence tab requested but not in response — graceful fallback */
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
            <p className="text-xs text-neutral-400">
              Architecture Intelligence data is not available in this analysis result. Re-run the analysis to generate it.
            </p>
            <button
              onClick={runAnalysis}
              disabled={loading}
              className="text-xs font-mono text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 underline underline-offset-2 transition-colors disabled:opacity-40"
            >
              {loading ? "Analyzing..." : "Re-run analysis"}
            </button>
          </div>
        ) : (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 h-full">
            {/* Col 1: Type + Narrative + Strengths */}
            <div className="space-y-5">
              <NarrativeCard insight={insight} />
            </div>

            {/* Col 2: Issues */}
            <div className="space-y-5">
              <IssuesCard insight={insight} />
            </div>

            {/* Col 3: Recommendations */}
            <div className="space-y-5">
              <RecommendationsCard insight={insight} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
