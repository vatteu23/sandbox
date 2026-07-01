"use client";

import { cn } from "@/functions/cn";
import { ShieldCheck } from "lucide-react";

export default function ClientSideBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800",
        "bg-neutral-50 dark:bg-neutral-900/60 px-3 py-1.5",
        "text-xs font-mono text-neutral-600 dark:text-neutral-400",
        className
      )}
    >
      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <span>Runs entirely in your browser — your data never leaves this device</span>
    </div>
  );
}
