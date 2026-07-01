"use client";

import { cn } from "@/functions/cn";
import type { ReactNode } from "react";

type WorkspaceVariant = "split" | "split-sidebar" | "input-output" | "tabs";

interface ToolWorkspaceProps {
  variant?: WorkspaceVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<WorkspaceVariant, string> = {
  split: "grid grid-cols-1 lg:grid-cols-2 gap-4",
  "split-sidebar":
    "grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4",
  "input-output": "flex flex-col gap-4",
  tabs: "flex flex-col gap-4",
};

export default function ToolWorkspace({
  variant = "split",
  children,
  className,
}: ToolWorkspaceProps) {
  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}
