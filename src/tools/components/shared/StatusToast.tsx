"use client";

import { cn } from "@/functions/cn";
import type { ExportStatus } from "@/tools/lib/export/types";

interface StatusToastProps {
  status: ExportStatus;
  message: string;
  className?: string;
}

export default function StatusToast({ status, message, className }: StatusToastProps) {
  const isVisible = status !== "idle" && Boolean(message);

  return (
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "text-xs font-mono transition-all duration-200",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
        status === "success" && "text-emerald-600 dark:text-emerald-400",
        status === "error" && "text-red-600 dark:text-red-400",
        className
      )}
    >
      {isVisible ? message : " "}
    </p>
  );
}
