"use client";

import { cn } from "@/functions/cn";
import type { ReactNode } from "react";

interface ToolPanelProps {
  label?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function ToolPanel({
  label,
  actions,
  children,
  className,
  noPadding,
}: ToolPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800",
        "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm overflow-hidden",
        "min-h-[280px] lg:min-h-[480px]",
        className
      )}
    >
      {(label || actions) && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-900">
          {label && (
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              {label}
            </span>
          )}
          {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
        </div>
      )}
      <div className={cn("flex-1 flex flex-col", !noPadding && "p-4")}>{children}</div>
    </div>
  );
}
