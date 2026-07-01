"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Play, Search, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import SidebarPanel from "./SidebarPanel";
import InsightsPanel from "./InsightsPanel";
import ReactFlowPanel from "./ReactFlowPanel";
import AiPanel from "./AiPanel";

// Single source of truth — re-exported for all child components
export type { CrawlNode, CrawlEdge } from "./lib/crawler/types";
import type { CrawlNode, CrawlEdge } from "./lib/crawler/types";
import type { AiInsight } from "./AiPanel";

const DEFAULT_PANEL_HEIGHT = 480;
const PAGE_LIMIT_OPTIONS = [50, 100, 250, 500];

export default function SiteAtlasTool() {
  const [url, setUrl] = useState("");
  const [maxPages, setMaxPages] = useState(100);
  const [isCrawling, setIsCrawling] = useState(false);
  const [nodes, setNodes] = useState<CrawlNode[]>([]);
  const [edges, setEdges] = useState<CrawlEdge[]>([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiPanelHeight, setAiPanelHeight] = useState(DEFAULT_PANEL_HEIGHT);
  const [aiInsight, setAiInsight] = useState<AiInsight | null>(null);

  // Ref to read latest nodes inside the complete handler without stale closure
  const nodesRef = useRef<CrawlNode[]>([]);
  const esRef = useRef<EventSource | null>(null);

  const updateNodes = (updater: (prev: CrawlNode[]) => CrawlNode[]) => {
    setNodes((prev) => {
      const next = updater(prev);
      nodesRef.current = next;
      return next;
    });
  };

  const startCrawl = () => {
    if (!url || isCrawling) return;

    // Close any existing connection
    esRef.current?.close();
    setIsCrawling(true);
    setNodes([]);
    setEdges([]);
    nodesRef.current = [];
    setSelectedNodeId(null);
    setAiPanelOpen(false);
    setAiInsight(null);
    setStatusMsg("Starting crawler...");

    const eventSource = new EventSource(
      `/api/crawl?url=${encodeURIComponent(url)}&maxPages=${maxPages}`
    );
    esRef.current = eventSource;

    eventSource.addEventListener("start", (e) => {
      try {
        const data = JSON.parse(e.data);
        setStatusMsg(data.message);
      } catch {}
    });

    eventSource.addEventListener("node", (e) => {
      try {
        const data = JSON.parse(e.data);
        updateNodes((prev) => [...prev, data]);
        setStatusMsg(`Discovering pages...`);
      } catch {}
    });

    eventSource.addEventListener("node_update", (e) => {
      try {
        const data = JSON.parse(e.data);
        updateNodes((prev) => prev.map((n) => (n.id === data.id ? data : n)));
      } catch {}
    });

    eventSource.addEventListener("edge", (e) => {
      try {
        const data = JSON.parse(e.data);
        setEdges((prev) => [...prev, data]);
      } catch {}
    });

    eventSource.addEventListener("status", (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.message) setStatusMsg(data.message);
      } catch {}
    });

    eventSource.addEventListener("error", (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data);
        setStatusMsg(data.message || "Crawl encountered an error.");
      } catch {
        setStatusMsg("Crawl encountered an error.");
      }
    });

    eventSource.addEventListener("complete", async () => {
      eventSource.close();
      esRef.current = null;

      const completedNodes = nodesRef.current;
      const unknownUrls = completedNodes
        .filter((n) => n.category === "Other")
        .map((n) => n.url);

      if (unknownUrls.length === 0) {
        setIsCrawling(false);
        setStatusMsg("Analysis complete.");
        return;
      }

      setStatusMsg("Classifying pages with AI...");
      try {
        const res = await fetch("/api/classify-urls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: unknownUrls }),
        });
        if (res.ok) {
          const classifications = await res.json();
          updateNodes((prev) =>
            prev.map((n) => ({
              ...n,
              category: classifications[n.url] || n.category,
            }))
          );
          setStatusMsg("Analysis complete.");
        } else {
          setStatusMsg("Classification failed — crawl data is still available.");
        }
      } catch {
        setStatusMsg("Classification failed — crawl data is still available.");
      } finally {
        setIsCrawling(false);
      }
    });

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) return;
      setStatusMsg("Connection lost.");
      setIsCrawling(false);
      eventSource.close();
      esRef.current = null;
    };
  };

  const stopCrawl = () => {
    esRef.current?.close();
    esRef.current = null;
    setIsCrawling(false);
    setStatusMsg("Crawl stopped.");
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;
  const crawlDone = !isCrawling && nodes.length > 0;

  return (
    <div className="flex flex-col h-full min-h-0 w-full bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 flex-none bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-ibm">
        {/* Main toolbar row */}
        <div className="h-12 flex items-center px-3 gap-3">
          {/* Left: back + title */}
          <div className="flex items-center gap-2 flex-none">
            <Link
              href="/tools"
              className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hidden sm:block select-none">
              Site Atlas
            </span>
            <div className="h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" />
          </div>

          {/* Center: URL input + controls */}
          <div className="flex items-center gap-2 flex-1 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-9 pr-4 py-1.5 text-sm
                  text-neutral-900 dark:text-neutral-100
                  bg-neutral-100 dark:bg-neutral-800
                  border border-neutral-200 dark:border-neutral-700
                  rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400/40
                  placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                onKeyDown={(e) => e.key === "Enter" && !isCrawling && startCrawl()}
              />
            </div>

            {/* Page limit picker */}
            {!isCrawling && (
              <div className="flex items-center gap-px bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md p-0.5 flex-none">
                {PAGE_LIMIT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setMaxPages(n)}
                    className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                      maxPages === n
                        ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                        : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}

            {isCrawling ? (
              <button
                onClick={stopCrawl}
                className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm font-medium rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700"
              >
                <span className="w-2 h-2 rounded-sm bg-current" />
                Stop
              </button>
            ) : (
              <button
                onClick={startCrawl}
                disabled={!url}
                className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-200 disabled:opacity-40 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                Analyze
              </button>
            )}
          </div>

        </div>

        {/* Status bar row — slides in when crawling or has status */}
        {(isCrawling || statusMsg) && (
          <div className="border-t border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/80 dark:bg-neutral-950/40 animate-in slide-in-from-top-1 duration-200">
            {/* Progress bar */}
            {isCrawling && maxPages > 0 && (
              <div className="h-0.5 bg-neutral-100 dark:bg-neutral-800">
                <div
                  className="h-full bg-neutral-400 dark:bg-neutral-500 transition-all duration-500"
                  style={{ width: `${Math.min((nodes.length / maxPages) * 100, 100)}%` }}
                />
              </div>
            )}
            <div className="h-7 flex items-center px-3 gap-3">
              {isCrawling && (
                <Loader2 className="w-3 h-3 animate-spin text-neutral-400 flex-none" />
              )}
              <span className="text-xs font-mono text-neutral-500 truncate flex-1">
                {statusMsg}
              </span>
              {nodes.length > 0 && (
                <span className="text-xs font-mono text-neutral-400 flex-none">
                  {nodes.length}{isCrawling ? ` / ${maxPages}` : ""} pages · {edges.length} edges
                </span>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main workspace — 3 columns */}
      <main
        className="flex flex-1 min-h-0 overflow-hidden relative z-10 font-ibm transition-[padding-bottom] duration-300"
        style={{ paddingBottom: aiPanelOpen ? aiPanelHeight : 0 }}
      >
        {/* Left: Site tree */}
        <aside className="w-[280px] xl:w-[300px] shrink-0 min-h-0 overflow-hidden border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#111]">
          <SidebarPanel
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            isCrawling={isCrawling}
          />
        </aside>

        {/* Center: Architecture map */}
        <section className="flex flex-1 min-w-0 min-h-0 flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a]">
          <div className="shrink-0 h-12 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4">
            <h2 className="text-xs font-mono uppercase tracking-widest font-medium text-neutral-900 dark:text-neutral-100">
              Architecture Map
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              {nodes.length > 0 ? `${nodes.length} nodes` : "Ready"}
            </span>
          </div>
          <div className="flex-1 min-h-0">
            <ReactFlowPanel
              nodes={nodes}
              edges={edges}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
            />
          </div>
        </section>

        {/* Right: Metrics & insights */}
        <aside className="w-[520px] xl:w-[580px] shrink-0 min-h-0 overflow-hidden bg-white dark:bg-[#0a0a0a]">
          <InsightsPanel
            nodes={nodes}
            edges={edges}
            selectedNode={selectedNode}
            isCrawling={isCrawling}
            aiInsight={aiInsight}
          />
        </aside>
      </main>

      {/* Floating AI trigger — appears after crawl, bottom-right */}
      {crawlDone && !aiPanelOpen && (
        <button
          onClick={() => setAiPanelOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
            flex items-center gap-2 px-5 py-2.5
            bg-neutral-950 dark:bg-neutral-100
            text-white dark:text-neutral-900
            text-sm font-medium font-ibm
            rounded-full shadow-lg hover:shadow-xl
            hover:bg-neutral-800 dark:hover:bg-white
            transition-all duration-200 whitespace-nowrap
            animate-in fade-in slide-in-from-bottom-2"
        >
          <Sparkles className="w-4 h-4" />
          Analyze with AI
        </button>
      )}

      {/* AI Panel — full-width bottom drawer */}
      <AiPanel
        nodes={nodes}
        edges={edges}
        isOpen={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        insight={aiInsight}
        onInsightChange={setAiInsight}
        onHeightChange={setAiPanelHeight}
      />
    </div>
  );
}
