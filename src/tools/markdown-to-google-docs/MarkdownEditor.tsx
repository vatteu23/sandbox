"use client";

import { cn } from "@/functions/cn";
import { PencilLine } from "lucide-react";
import { SAMPLE_MARKDOWN } from "@/tools/lib/markdown/sampleContent";
import MarkdownUploadZone from "./MarkdownUploadZone";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const lineCount = value ? value.split("\n").length : 0;

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <div className="relative z-10 h-14 shrink-0 flex items-center justify-between gap-3 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="flex items-center gap-2 min-w-0">
          <PencilLine className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
          <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
            Edit markdown content
          </h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="min-w-[64px] text-right text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
            {lineCount} {lineCount === 1 ? "line" : "lines"}
          </span>
          <button
            type="button"
            onClick={() => onChange(SAMPLE_MARKDOWN)}
            className="text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded-md px-2.5 py-1 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            Load example
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            disabled={!value}
            className={cn(
              "min-w-[38px] text-xs transition-colors",
              value
                ? "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                : "pointer-events-none text-transparent"
            )}
          >
            Clear
          </button>
        </div>
      </div>

      <MarkdownUploadZone onImport={onChange} />

      <div className="flex-1 min-h-0 overflow-hidden p-4 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Start writing..."
          spellCheck={false}
          className={cn(
            "block min-h-0 w-full h-full resize-none overflow-y-auto",
            "rounded-lg border px-4 py-4",
            "font-mono text-[13px] leading-[1.75]",
            "border-neutral-200 bg-neutral-50 text-neutral-900",
            "placeholder:text-transparent",
            "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
            "focus:outline-none focus:ring-2 focus:ring-neutral-400/30",
            "dark:focus:ring-neutral-500/40"
          )}
        />
        {!value && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center pt-24 pb-12 text-neutral-400 dark:text-neutral-500">
            <PencilLine className="h-8 w-8 mb-3 opacity-30 stroke-[1.5]" aria-hidden="true" />
            <p className="text-sm font-mono opacity-80">
              # Start writing...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
