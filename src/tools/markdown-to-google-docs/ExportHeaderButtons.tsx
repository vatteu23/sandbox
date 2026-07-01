"use client";

import { cn } from "@/functions/cn";
import { useExportActions } from "@/tools/hooks/useExportActions";
import type { ExportAction } from "@/tools/types";
import { Copy, Download } from "lucide-react";

interface ExportHeaderButtonsProps {
  actions: ExportAction[];
  canExport: boolean;
  className?: string;
}

export default function ExportHeaderButtons({
  actions,
  canExport,
  className,
}: ExportHeaderButtonsProps) {
  const { status, isRunning, lastActionId, runAction } = useExportActions();

  const download = actions.find((a) => a.variant === "download");
  const copy = actions.find((a) => a.variant === "copy");
  const copyActive = Boolean(copy && lastActionId === copy.id);
  const downloadActive = Boolean(download && lastActionId === download.id);

  const copyLabel = copyActive
    ? isRunning
      ? "Copying..."
      : status === "success"
        ? "Copied"
        : status === "error"
          ? "Retry copy"
          : "Copy formatted"
    : "Copy formatted";

  const copyCompactLabel = copyActive
    ? isRunning
      ? "Copying..."
      : status === "success"
        ? "Copied"
        : status === "error"
          ? "Retry"
          : "Copy"
    : "Copy";

  const downloadLabel = downloadActive
    ? isRunning
      ? "Downloading..."
      : status === "success"
        ? "Downloaded"
        : status === "error"
          ? "Retry download"
          : "Download .docx"
    : "Download .docx";

  const downloadCompactLabel = downloadActive
    ? isRunning
      ? "Saving..."
      : status === "success"
        ? "Saved"
        : status === "error"
          ? "Retry"
          : ".docx"
    : ".docx";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {copy && (
        <button
          type="button"
          onClick={() => runAction(copy)}
          disabled={!canExport || isRunning}
          title="Copy formatted"
          aria-busy={isRunning}
          aria-label="Copy formatted"
          className={cn(
            "inline-flex h-8 min-w-[86px] items-center justify-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40",
            !canExport && "opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800 text-neutral-400",
            canExport && copyActive && status === "success" && "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400",
            canExport && copyActive && status === "error" && "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400",
            canExport && (!copyActive || status === "idle") && "border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          )}
        >
          <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden lg:inline">{copyLabel}</span>
          <span className="lg:hidden">{copyCompactLabel}</span>
        </button>
      )}
      {download && (
        <button
          type="button"
          onClick={() => runAction(download)}
          disabled={!canExport || isRunning}
          title="Download .docx"
          aria-busy={isRunning}
          aria-label="Download DOCX"
          className={cn(
            "inline-flex h-8 min-w-[86px] items-center justify-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40",
            !canExport && "opacity-40 cursor-not-allowed bg-neutral-200 dark:bg-neutral-800 text-neutral-400",
            canExport && downloadActive && status === "success" && "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
            canExport && downloadActive && status === "error" && "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
            canExport && (!downloadActive || status === "idle") && "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90"
          )}
        >
          <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden lg:inline">{downloadLabel}</span>
          <span className="lg:hidden">{downloadCompactLabel}</span>
        </button>
      )}
    </div>
  );
}
