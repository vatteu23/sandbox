"use client";

import ClientSideBadge from "../shared/ClientSideBadge";

export default function ToolsHero() {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-6">
        Tools
      </p>
      <h1
        className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-6"
        style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
      >
        Useful tools, zero trust required
      </h1>
      <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed mb-6">
        High-quality, day-to-day utilities I actually use. Paste, convert, export, analyze.
      </p>
    </div>
  );
}
