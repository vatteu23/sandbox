"use client";

import { cn } from "@/functions/cn";
import type { TypographyStyles } from "@/tools/lib/markdown/defaultStyles";
import { typographyToCssVars } from "@/tools/lib/markdown/defaultStyles";
import type { ExportAction } from "@/tools/types";
import DocumentToolbar from "./DocumentToolbar";
import ExportHeaderButtons from "./ExportHeaderButtons";
import { Eye, SlidersHorizontal, FileText } from "lucide-react";
import { useState } from "react";

interface LivePreviewPanelProps {
  html: string;
  styles: TypographyStyles;
  onStylesChange: (styles: TypographyStyles) => void;
  exportActions: ExportAction[];
  canExport: boolean;
}

export default function LivePreviewPanel({
  html,
  styles,
  onStylesChange,
  exportActions,
  canExport,
}: LivePreviewPanelProps) {
  const [showFormat, setShowFormat] = useState(false);
  const hasContent = html.trim().length > 0;

  return (
    <div className="relative flex flex-col h-full min-h-0 overflow-hidden">
      {/* Fixed header — outside scroll area */}
      <div className="relative z-10 h-14 shrink-0 flex items-center justify-between gap-2 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="flex items-center gap-2 min-w-0">
          <Eye className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
          <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
            Live preview
          </h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ExportHeaderButtons actions={exportActions} canExport={canExport} />
          <button
            type="button"
            onClick={() => setShowFormat((v) => !v)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors",
              showFormat
                ? "border-neutral-400 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            )}
            aria-label="Toggle formatting options"
            aria-expanded={showFormat}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "absolute left-0 right-0 top-14 z-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm transition-opacity",
          showFormat ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <DocumentToolbar
          styles={styles}
          onChange={onStylesChange}
          exportActions={[]}
          canExport={false}
          hideExport
        />
      </div>

      {/* Scrollable preview */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        <div className="min-h-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white text-neutral-900 [color-scheme:light]">
          <div className="p-6 md:p-8">
            {!hasContent ? (
              <div className="flex flex-col items-center justify-center pt-24 pb-12 text-neutral-400">
                <FileText className="h-8 w-8 mb-3 opacity-40 stroke-[1.5]" aria-hidden="true" />
                <p className="text-sm">
                  Your markdown preview will appear here
                </p>
              </div>
            ) : (
              <div
                className="md-preview md-preview--paper max-w-none text-neutral-900"
                style={typographyToCssVars(styles)}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
