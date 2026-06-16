"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import {
  Accessibility,
  ArrowUpRight,
  BookOpen,
  Bot,
  Camera,
  Car,
  ChevronDown,
  ChevronRight,
  Code2,
  Compass,
  Gauge,
  Hand,
  Layers3,
  Monitor,
  MoveRight,
  UserRound,
  Zap,
} from "lucide-react";
import { graphNodeMap } from "@/data/graph/nodes";
import type { GraphNode, GraphPath } from "@/data/graph/types";

type ConceptExplorerProps = {
  nodes: GraphNode[];
  paths: GraphPath[];
  selectedId: string;
  onSelectNode: (id: string) => void;
};

const ABOUT_TAB_ID = "about-me";

const nodeIconMap: Record<string, React.ElementType> = {
  accessibility: Accessibility,
  "semantic-html": Code2,
  "keyboard-navigation": Hand,
  "design-systems": Layers3,
  "frontend-architecture": Code2,
  "developer-experience": Monitor,
  "ai-systems": Bot,
  performance: Gauge,
  "content-systems": BookOpen,
  "interaction-design": Hand,
  motion: MoveRight,
  photography: Camera,
  cars: Car,
};

function getIcon(nodeId: string): React.ElementType {
  return nodeIconMap[nodeId] || Compass;
}

type TimelineEntry = {
  id: string;
  title: string;
  eyebrow: string;
  body: string;
  links?: Array<{ label: string; href?: string; targetNodeId?: string }>;
  icon: React.ElementType;
};

const concepts = [
  "design-systems",
  "frontend-architecture",
  "accessibility",
  "ai-systems",
  "performance",
  "content-systems",
  "interaction-design",
  "motion",
  "developer-experience",
  "photography",
  "cars",
];

export default function ConceptExplorer({
  nodes,
  paths,
  selectedId,
  onSelectNode,
}: ConceptExplorerProps) {
  const mobileTopAnchorRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const node = selectedId === ABOUT_TAB_ID ? null : graphNodeMap[selectedId];
  const conceptNodes = useMemo(
    () =>
      concepts
        .map((id) => graphNodeMap[id])
        .filter((item): item is GraphNode => Boolean(item)),
    [nodes],
  );
  const tabs = useMemo(
    () => [
      { id: ABOUT_TAB_ID, title: "About me", icon: UserRound },
      ...conceptNodes.map((concept) => ({
        id: concept.id,
        title: concept.title,
        icon: getIcon(concept.id),
      })),
    ],
    [conceptNodes],
  );
  const selectedTab = tabs.find((tab) => tab.id === selectedId) || tabs[0];
  const SelectedTabIcon = selectedTab.icon;

  const scrollStageToTop = () => {
    const anchor = mobileTopAnchorRef.current;
    if (!anchor) return;
    const headerOffset = 56; // h-14 header
    const absoluteTop = window.scrollY + anchor.getBoundingClientRect().top;
    const targetTop = Math.max(0, absoluteTop - headerOffset);
    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!mobileMenuRef.current) return;
      if (!mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const relatedPaths = node
    ? paths.filter(
        (p) =>
          p.startNodeId === node.id ||
          p.endNodeId === node.id ||
          p.steps.some((s) => s.nodeId === node.id),
      )
    : [];

  const timelineEntries = useMemo<TimelineEntry[]>(() => {
    if (!node) {
      return [
        {
          id: "about-overview",
          eyebrow: "About me",
          title: "Design intent should survive production reality.",
          body:
            "I work across design systems, frontend architecture, and AI-assisted delivery so product decisions stay intact from concept to shipped experience.",
          links: conceptNodes.slice(0, 4).map((entry) => ({
            label: entry.title,
            targetNodeId: entry.id,
          })),
          icon: UserRound,
        },
        {
          id: "about-work",
          eyebrow: "Focus areas",
          title: "Systems, performance, and implementation quality.",
          body:
            "I care about interface clarity, durable architecture, and tooling that helps teams ship with less rework.",
          links: [
            { label: "View selected work", href: "/work" },
            { label: "Read more about me", href: "/about" },
          ],
          icon: Layers3,
        },
      ];
    }

    const relatedLinks = node.relatedNodes
      .filter((id) => id !== "uday-vatti")
      .slice(0, 4)
      .map((id) => ({
        label: graphNodeMap[id]?.title || id,
        targetNodeId: id,
      }));

    const workLinks = node.examples.slice(0, 4).map((example) => ({
      label: example.title,
      href: example.href || "/work",
    }));

    const exploringLinks =
      node.experiments.length > 0
        ? node.experiments.slice(0, 4).map((exp) => ({ label: exp.title }))
        : relatedPaths.slice(0, 4).map((path) => ({ label: path.title }));

    return [
      {
        id: `${node.id}-overview`,
        eyebrow: "Concept",
        title: node.title,
        body: `${node.summary} ${node.philosophy}`,
        icon: getIcon(node.id),
      },
      {
        id: `${node.id}-work`,
        eyebrow: "Evidence",
        title: "Where this shows up in shipped work",
        body:
          workLinks.length > 0
            ? "Projects where this concept directly shaped decisions and outcomes."
            : "No direct project evidence is attached to this concept yet.",
        links: workLinks,
        icon: BookOpen,
      },
      {
        id: `${node.id}-related`,
        eyebrow: "Connections",
        title: "How this concept connects to the wider system",
        body:
          relatedLinks.length > 0
            ? "Adjacent concepts that influence how this one gets implemented."
            : "No adjacent concepts mapped for this node yet.",
        links: relatedLinks,
        icon: MoveRight,
      },
      {
        id: `${node.id}-exploring`,
        eyebrow: node.id === "cars" ? "Dream cars" : "Exploring",
        title:
          node.experiments.length > 0
            ? "Active explorations and curiosities"
            : "Related thinking paths",
        body:
          node.experiments.length > 0
            ? "Current experiments shaping future design and engineering decisions."
            : "Reasoning patterns connected to this concept.",
        links: exploringLinks,
        icon: Zap,
      },
    ];
  }, [conceptNodes, node, relatedPaths]);

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.9 }}>
      <div>
        <div ref={mobileTopAnchorRef} className="md:hidden h-0" />
        <div
          ref={mobileDropdownRef}
          className="md:hidden sticky top-14 z-30 bg-white/95 dark:bg-neutral-950/95 backdrop-blur px-1 py-2"
          style={{ scrollMarginTop: "3.5rem" }}
        >
          <div ref={mobileMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-700 dark:text-neutral-200"
              aria-haspopup="listbox"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="inline-flex items-center gap-2 min-w-0">
                <SelectedTabIcon size={14} strokeWidth={1.5} />
                <span className="truncate">{selectedTab.title}</span>
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  className="absolute left-0 right-0 mt-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2 shadow-lg z-40"
                  role="listbox"
                >
                  <div className="max-h-[320px] overflow-y-auto space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const active = tab.id === selectedId;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            onSelectNode(tab.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full inline-flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                            active
                              ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                          }`}
                        >
                          <span className="inline-flex items-center gap-2 min-w-0">
                            <Icon size={14} strokeWidth={1.5} />
                            <span className="truncate">{tab.title}</span>
                          </span>
                          <ChevronRight size={13} className="opacity-50" />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
          <LayoutGroup id="concepts">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.03, delayChildren: 0.05 },
                },
              }}
              className="hidden md:flex flex-wrap gap-2 p-4 md:p-5 border-b border-neutral-100 dark:border-neutral-900"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = selectedId === tab.id;
                return (
                  <motion.button
                    type="button"
                    key={tab.id}
                    onClick={() => onSelectNode(tab.id)}
                    variants={{
                      hidden: { opacity: 0, y: 8, scale: 0.98 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={[
                      "relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm",
                      active
                        ? "border-neutral-900 text-white dark:border-neutral-100 dark:text-neutral-900"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
                    ].join(" ")}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-concept-pill"
                        className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Icon size={14} strokeWidth={1.5} />
                      {tab.title}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </LayoutGroup>

          <div className="relative p-6 md:p-8 bg-gradient-to-b from-transparent via-neutral-50/50 to-neutral-100/40 dark:from-transparent dark:via-neutral-950 dark:to-black">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.08)_0%,transparent_45%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06)_0%,transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.06)_0%,transparent_45%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04)_0%,transparent_40%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="relative z-10 pl-8 md:pl-10"
              >
                <div className="absolute left-2.5 md:left-3 top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800" />
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                  }}
                  className="space-y-6"
                >
                  {timelineEntries.map((entry, index) => {
                    const EntryIcon = entry.icon;
                    return (
                      <motion.section
                        key={entry.id}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 },
                        }}
                        className="relative"
                      >
                        <motion.div
                          className="absolute -left-[2.15rem] md:-left-[2.6rem] top-1 h-6 w-6 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 flex items-center justify-center"
                          whileHover={{ scale: 1.08 }}
                        >
                          <EntryIcon size={12} className="text-neutral-500 dark:text-neutral-400" />
                        </motion.div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500 mb-2">
                          {String(index + 1).padStart(2, "0")} · {entry.eyebrow}
                        </p>
                        <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                          {entry.title}
                        </h3>
                        <p className="text-sm md:text-[15px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {entry.body}
                        </p>
                        {entry.links && entry.links.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {entry.links.map((link) => {
                              if (link.href) {
                                return (
                                  <motion.div key={link.label} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                      href={link.href}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                                    >
                                      {link.label}
                                      <ArrowUpRight size={11} />
                                    </Link>
                                  </motion.div>
                                );
                              }

                              if (link.targetNodeId) {
                                return (
                                  <motion.button
                                    type="button"
                                    key={link.label}
                                    onClick={() => {
                                    onSelectNode(link.targetNodeId as string);
                                    requestAnimationFrame(() => {
                                      scrollStageToTop();
                                    });
                                    }}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                                  >
                                    {link.label}
                                    <ChevronRight size={11} />
                                  </motion.button>
                                );
                              }

                              return (
                                <span
                                  key={link.label}
                                  className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400"
                                >
                                  {link.label}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </motion.section>
                    );
                  })}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
