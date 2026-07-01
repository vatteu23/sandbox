"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/functions/cn";

interface ToolBackLinkProps {
  className?: string;
}

export default function ToolBackLink({ className }: ToolBackLinkProps) {
  return (
    <Link
      href="/tools"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400",
        "hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors",
        className
      )}
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
      Tools
    </Link>
  );
}
