"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/functions/cn";
import type { ToolDefinition } from "@/tools/types";

const CONTENT_TRANSITION = {
  duration: 0.38,
  ease: [0.32, 0.72, 0, 1] as const,
};

const PANEL_HEIGHT = "h-[12rem] md:h-[13rem]";
const PANEL_INNER = cn(PANEL_HEIGHT, "flex flex-col justify-end flex-shrink-0 p-6 md:p-7");

interface ToolCardProps {
  tool: ToolDefinition;
  index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = tool.icon;
  const isAvailable = tool.status === "available";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const content = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "project-card relative aspect-[4/3] md:aspect-[5/4] rounded-[20px] overflow-hidden w-full",
        isAvailable ? "cursor-pointer" : "cursor-default",
        "border border-neutral-200/80 dark:border-neutral-800",
        "bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950",
        "shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-none",
        isAvailable
          ? "transition-shadow duration-300 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
          : "opacity-70"
      )}
    >
      {/* Top row: icon + status + arrow */}
      <div className="relative z-10 flex items-start justify-between p-6 md:p-7 pb-0">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 bg-white dark:bg-neutral-950",
            hovered && isAvailable 
              ? "border-neutral-900 dark:border-neutral-100" 
              : "border-neutral-200 dark:border-neutral-800"
          )}>
            <Icon 
              className={cn(
                "h-5 w-5 transition-colors duration-200 text-neutral-700 dark:text-neutral-300",
                hovered && isAvailable && "text-neutral-900 dark:text-neutral-100"
              )} 
              aria-hidden="true" 
            />
          </div>
          <span
            className={cn(
              "text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border",
              isAvailable
                ? "border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400"
                : "border-neutral-200 dark:border-neutral-800 text-neutral-400"
            )}
          >
            {isAvailable ? "Available" : "Coming soon"}
          </span>
        </div>

        {isAvailable && (
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
        )}
      </div>

      {/* Bottom content viewport — single track, one panel visible at a time */}
      <div className={cn("absolute inset-x-0 bottom-0 z-10 overflow-hidden", PANEL_HEIGHT)}>
        <motion.div
          className="flex flex-col will-change-transform"
          animate={{ y: hovered ? "-50%" : "0%" }}
          transition={CONTENT_TRANSITION}
        >
          <div className={PANEL_INNER} aria-hidden={hovered}>
            <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] mb-2.5 md:mb-3 truncate">
              {tool.category}
            </p>
            <h3 className="text-2xl md:text-3xl font-normal text-neutral-900 dark:text-neutral-100 leading-[1.05] tracking-tight">
              {tool.title}
            </h3>
          </div>

          <div className={PANEL_INNER} aria-hidden={!hovered}>
            <h3 className="text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 leading-[1.05] tracking-tight mb-3 md:mb-4">
              {tool.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug line-clamp-3">
              {tool.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const wrapperClassName = "block flex-shrink-0 w-full";

  if (!isAvailable) {
    return <div className={wrapperClassName}>{content}</div>;
  }

  return (
    <Link href={`/tools/${tool.slug}`} className={wrapperClassName}>
      {content}
    </Link>
  );
}
