"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/functions/cn";
import type { PorjectProps } from "@/pages/index";
import { projectConceptNarratives } from "@/data/graph/projectConcepts";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

interface ProjectCardProps {
  project: PorjectProps;
  index: number;
  fluid?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, fluid }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const isCurrent = project.year?.includes("Present");
  const highlights = (project.highlights ?? []).slice(0, 3).map(stripHtml);
  const narrative = projectConceptNarratives[project.id];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <Link
      href={`/work/${project.id}`}
      className={cn(
        "block flex-shrink-0 w-full",
        !fluid && "md:w-[360px] lg:w-[360px]"
      )}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "project-card relative aspect-[4/3] md:aspect-[5/4] rounded-[20px] overflow-hidden cursor-pointer",
          "border border-neutral-200/80 dark:border-neutral-800",
          "bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950",
          "shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-none",
          "transition-shadow duration-300 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
        )}
      >
        {/* Top row: index + current + arrow */}
        <div className="relative z-10 flex items-start justify-between p-6 md:p-7 pb-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 tabular-nums tracking-widest">
              {String(index + 1).padStart(2, "0")}
            </span>
            {isCurrent && (
              <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neutral-500 dark:bg-neutral-300" />
                </span>
                Current
              </span>
            )}
          </div>

          <div
            className={cn(
              "w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200",
              hovered
                ? "border-neutral-900 bg-neutral-900 dark:border-neutral-100 dark:bg-neutral-100"
                : "border-neutral-300 dark:border-neutral-700 bg-transparent"
            )}
          >
            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ArrowUpRight
                size={15}
                className={cn(
                  "transition-colors duration-200",
                  hovered
                    ? "text-white dark:text-neutral-900"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
              />
            </motion.div>
          </div>
        </div>

        {/* Default content — fades out on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-7"
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? -8 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {narrative?.concept ? (
            <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-2.5 md:mb-3 truncate">
              {narrative.concept}
            </p>
          ) : (
            project.metric && (
              <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-2.5 md:mb-3 truncate">
                {project.metric}
              </p>
            )
          )}
          <h3 className="text-2xl md:text-3xl font-normal text-neutral-900 dark:text-neutral-100 leading-[1.05] tracking-tight mb-2.5">
            {project.name}
          </h3>
          <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {project.role}
            {project.year && (
              <span className="text-neutral-400 dark:text-neutral-500"> · {project.year}</span>
            )}
          </p>
        </motion.div>

        {/* Narrative preview — slides up on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-7"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <h3 className="text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 leading-[1.05] tracking-tight mb-3 md:mb-5">
            {project.name}
          </h3>
          {narrative ? (
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                {narrative.concept}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-snug line-clamp-2">
                <span className="text-neutral-400 dark:text-neutral-500 mr-1">Problem:</span>
                {narrative.problem}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-snug line-clamp-2">
                <span className="text-neutral-400 dark:text-neutral-500 mr-1">Outcome:</span>
                {narrative.outcome}
              </p>
            </div>
          ) : (
            <ul className="space-y-3 md:space-y-4">
              {highlights.map((line, i) => (
                <motion.li
                  key={i}
                  className="flex gap-2.5 md:gap-3 text-sm text-neutral-500 dark:text-neutral-400 leading-snug"
                  animate={{
                    opacity: hovered ? 1 : 0,
                    x: hovered ? 0 : -8,
                  }}
                  transition={{
                    duration: 0.22,
                    delay: hovered ? 0.07 + i * 0.06 : 0,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-neutral-400 dark:text-neutral-600 flex-shrink-0 mt-0.5">—</span>
                  <span className="line-clamp-2">{line}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
