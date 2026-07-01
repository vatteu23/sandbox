"use client";

import { cn } from "@/functions/cn";

interface ToolHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export default function ToolHero({ eyebrow, title, description, className }: ToolHeroProps) {
  return (
    <div className={cn("max-w-3xl mb-10", className)}>
      <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
        {eyebrow}
      </p>
      <h1
        className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {title}
      </h1>
      <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
