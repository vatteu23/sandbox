"use client";

import { cn } from "@/functions/cn";
import { useExportActions } from "@/tools/hooks/useExportActions";
import type { ExportAction } from "@/tools/types";
import StatusToast from "./StatusToast";
import { Copy, Download } from "lucide-react";

interface ExportBarProps {
  actions: ExportAction[];
  className?: string;
}

export default function ExportBar({ actions, className }: ExportBarProps) {
  const { status, message, runAction } = useExportActions();

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6",
        "border-t border-neutral-100 dark:border-neutral-900",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => runAction(action)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-mono transition-colors",
              action.variant === "download"
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90"
                : "border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            )}
          >
            {action.variant === "download" ? (
              <Download className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {action.label}
          </button>
        ))}
      </div>
      <StatusToast status={status} message={message} />
    </div>
  );
}
