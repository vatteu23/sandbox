"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ClientSideBadge from "@/tools/components/shared/ClientSideBadge";

export default function ConverterPageHeader() {
  return (
    <div className="mb-8 text-left">
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All tools
      </Link>

      <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
        Convert
      </p>
      <h1
        className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
      >
        Markdown → Google Docs
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed mb-4">
        A free, client-side tool to convert markdown into a formatted document.
        Upload or edit on the left, preview on the right, then download or copy.
      </p>
      <ClientSideBadge />
    </div>
  );
}
