"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import CommandCenter from "@/components/graph/CommandCenter";
import GraphCanvas from "@/components/graph/GraphCanvas";
import GraphLegend from "@/components/graph/GraphLegend";
import NodePanel from "@/components/graph/NodePanel";
import HeadWithMetas from "@/components/HeadWithMetas";
import Layout from "@/components/Layout";
import { graphEdges } from "@/data/graph/edges";
import { graphNodeMap, graphNodes } from "@/data/graph/nodes";
import { graphPaths } from "@/data/graph/paths";
import { Freelance, Porjects } from "@/data/projects";
import type { GraphNodeCategory, GraphSearchItem } from "@/data/graph/types";

export type { ImpactItem, PorjectProps } from "@/data/projects";
export { Freelance, Porjects } from "@/data/projects";

const categories: GraphNodeCategory[] = ["identity", "domain", "practice"];

export default function Home() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("uday-vatti");
  const [commandOpen, setCommandOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [graphMode, setGraphMode] = useState<"guided" | "explore">("explore");
  const [focusNodeId, setFocusNodeId] = useState("uday-vatti");
  const [showPractices, setShowPractices] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [connectionReason, setConnectionReason] = useState<string | null>(null);

  const selectedNode = graphNodeMap[selectedId] || null;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const applyMode = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setGraphMode(mobile ? "guided" : "explore");
    };
    applyMode();
    mediaQuery.addEventListener("change", applyMode);
    return () => mediaQuery.removeEventListener("change", applyMode);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const searchItems = useMemo<GraphSearchItem[]>(() => {
    const nodeItems = graphNodes.map((node) => ({
      id: node.id,
      title: node.title,
      summary: node.summary,
      type: "node" as const,
    }));

    const projectItems = [...Porjects, ...Freelance].map((project) => ({
      id: project.id,
      title: project.name,
      summary: project.description || project.metric || "Supporting work",
      type: "project" as const,
      href: `/work/${project.id}`,
    }));

    const pathItems = graphPaths.map((path) => ({
      id: path.id,
      title: path.title,
      summary: path.whyItMatters,
      type: "path" as const,
    }));

    return [...nodeItems, ...pathItems, ...projectItems];
  }, []);

  const handleSelectItem = (item: GraphSearchItem) => {
    if (item.type === "project" && item.href) {
      void router.push(item.href);
      return;
    }

    if (item.type === "path") {
      const path = graphPaths.find((entry) => entry.id === item.id);
      if (!path) {
        return;
      }
      setActivePathId(path.id);
      setSelectedId(path.startNodeId);
      setFocusNodeId(path.startNodeId);
      if (isMobile) {
        setGraphMode("guided");
      }
      return;
    }

    if (graphNodeMap[item.id]) {
      setSelectedId(item.id);
      setFocusNodeId(item.id);
      setActivePathId(null);
      if (isMobile) {
        setGraphMode("guided");
      }
      return;
    }
    const fromProject = graphNodes.find((node) =>
      node.examples.some((example) => example.projectId === item.id),
    );
    if (fromProject) {
      setSelectedId(fromProject.id);
      setFocusNodeId(fromProject.id);
      setActivePathId(null);
      if (isMobile) {
        setGraphMode("guided");
      }
    }
  };

  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen" showAssistant={false}>
      <HeadWithMetas
        title="Uday Vatti — Portfolio"
        description="I am a design engineer building product experiences across design systems, frontend architecture, and AI-enabled workflows."
        url="https://udayvatti.com"
        image="/images/uv-port.png"
      />

      <CommandCenter
        open={commandOpen}
        isMobile={isMobile}
        items={searchItems}
        nodes={graphNodes}
        paths={graphPaths}
        onClose={() => setCommandOpen(false)}
        onSelect={handleSelectItem}
      />

      <div className="pt-20 pb-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-20">
            <div className="max-w-3xl">
              <h1
                className="font-sans leading-[1.02] tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
                style={{ fontSize: "clamp(2rem, 4.4vw, 2.9rem)" }}
              >
                I build the space between product design and production code.
              </h1>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                My work focuses on design systems, frontend architecture, CMS platforms, and AI-assisted delivery across teams and products.
              </p>
              <div className="flex items-center gap-6 mt-6">
                <Link
                  href="/work"
                  className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:opacity-60 transition-opacity"
                >
                  View work →
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  About →
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden md:inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors self-start"
            >
              Search
              <span className="rounded-md border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 text-[9px]">
                ⌘K
              </span>
            </button>
          </div>

          <div className="mb-6">
            <GraphLegend categories={categories} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_390px] gap-5">
            <GraphCanvas
              nodes={graphNodes}
              edges={graphEdges}
              selectedId={selectedId}
              focusNodeId={focusNodeId}
              mode={graphMode}
              isMobile={isMobile}
              showPractices={showPractices}
              showEvidence={showEvidence}
              onEnterExplore={() => setGraphMode("explore")}
              onTogglePractices={() => setShowPractices((current) => !current)}
              onToggleEvidence={() => setShowEvidence((current) => !current)}
              onSelect={(id) => {
                setSelectedId(id);
                setActivePathId(null);
              }}
              onConnectionPreview={setConnectionReason}
            />
            <NodePanel
              node={selectedNode}
              connectionReason={connectionReason}
              paths={graphPaths}
              activePathId={activePathId}
              onSelectNode={(id) => {
                setSelectedId(id);
                setFocusNodeId(id);
                setActivePathId(null);
              }}
              onSelectPath={(pathId) => {
                const path = graphPaths.find((entry) => entry.id === pathId);
                if (!path) {
                  return;
                }
                setActivePathId(path.id);
                setSelectedId(path.startNodeId);
                setFocusNodeId(path.startNodeId);
              }}
              onReset={() => {
                setSelectedId("uday-vatti");
                setFocusNodeId("uday-vatti");
                setActivePathId(null);
                setConnectionReason(null);
              }}
            />
          </div>
        </Container>
      </div>

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 dark:bg-neutral-100 px-5 text-xs font-mono uppercase tracking-[0.16em] text-white dark:text-neutral-900 shadow-lg shadow-neutral-900/20 dark:shadow-neutral-100/10 active:scale-95 transition-transform"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        Search
      </button>

      <Footer />
    </Layout>
  );
}
