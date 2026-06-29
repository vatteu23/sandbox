"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import CommandCenter from "@/components/graph/CommandCenter";
import ConceptExplorer from "@/components/graph/ConceptExplorer";
import HeadWithMetas from "@/components/HeadWithMetas";
import Layout from "@/components/Layout";
import { graphNodeMap, graphNodes } from "@/data/graph/nodes";
import { graphPaths } from "@/data/graph/paths";
import { Freelance, Porjects } from "@/data/projects";
import type { GraphSearchItem } from "@/data/graph/types";

export type { ImpactItem, PorjectProps } from "@/data/projects";
export { Freelance, Porjects } from "@/data/projects";

const ABOUT_TAB_ID = "about-me";

export default function Home() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>(ABOUT_TAB_ID);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mediaQuery.matches);
    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
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
      if (!path) return;
      setSelectedId(path.startNodeId);
      return;
    }

    if (graphNodeMap[item.id]) {
      setSelectedId(item.id === "uday-vatti" ? ABOUT_TAB_ID : item.id);
      return;
    }

    const fromProject = graphNodes.find((node) =>
      node.examples.some((example) => example.projectId === item.id),
    );
    if (fromProject) {
      setSelectedId(fromProject.id);
    }
  };

  return (
    <Layout
      className="bg-white dark:bg-neutral-950 min-h-screen"
      showAssistant={false}
    >
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
          {/* Hero */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 md:mb-20">
            <div className="max-w-3xl">
              <h1
                className="font-sans leading-[1.02] tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
                style={{ fontSize: "clamp(2rem, 4.4vw, 2.9rem)" }}
              >
                I build and own web platforms that connect design and production
                code.
              </h1>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                My work spans design systems, frontend architecture, CMS-driven
                marketing sites, and AI-assisted engineering workflows across
                internal tools and customer-facing products.
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

          {/* Concept Explorer — pills + expandable detail */}
          <ConceptExplorer
            nodes={graphNodes}
            paths={graphPaths}
            selectedId={selectedId}
            onSelectNode={setSelectedId}
          />
        </Container>
      </div>

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 dark:bg-neutral-100 px-5 text-xs font-mono uppercase tracking-[0.16em] text-white dark:text-neutral-900 shadow-lg shadow-neutral-900/20 dark:shadow-neutral-100/10 active:scale-95 transition-transform"
      >
        <Search size={14} />
        Search
      </button>

      <Footer />
    </Layout>
  );
}
