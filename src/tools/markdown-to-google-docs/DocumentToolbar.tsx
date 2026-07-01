"use client";

import { cn } from "@/functions/cn";
import { useExportActions } from "@/tools/hooks/useExportActions";
import {
  DEFAULT_TYPOGRAPHY,
  FONT_OPTIONS,
  type TypographyStyles,
} from "@/tools/lib/markdown/defaultStyles";
import type { ExportAction } from "@/tools/types";
import StatusToast from "@/tools/components/shared/StatusToast";
import { ChevronDown, RotateCcw } from "lucide-react";
import { useState } from "react";

interface DocumentToolbarProps {
  styles: TypographyStyles;
  onChange: (styles: TypographyStyles) => void;
  exportActions: ExportAction[];
  canExport: boolean;
  hideExport?: boolean;
}

const controlClass = cn(
  "h-8 rounded-md border border-neutral-200 dark:border-neutral-700",
  "bg-white dark:bg-neutral-900 px-2",
  "text-xs text-neutral-800 dark:text-neutral-200",
  "focus:outline-none focus:ring-2 focus:ring-neutral-400/40"
);

export default function DocumentToolbar({
  styles,
  onChange,
  exportActions,
  canExport,
  hideExport = false,
}: DocumentToolbarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { status, message, runAction } = useExportActions();
  const update = (patch: Partial<TypographyStyles>) => onChange({ ...styles, ...patch });

  const bodyFonts = FONT_OPTIONS.filter(
    (f) => !f.value.includes("mono") && !f.value.includes("Courier")
  );
  const monoFonts = FONT_OPTIONS.filter(
    (f) => f.value.includes("mono") || f.value.includes("Courier")
  );

  return (
    <div className="shrink-0 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto">
        <select
          value={styles.bodyFont}
          onChange={(e) => update({ bodyFont: e.target.value })}
          className={cn(controlClass, "max-w-[130px] truncate")}
          aria-label="Body font"
        >
          {bodyFonts.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={styles.headingFont}
          onChange={(e) => update({ headingFont: e.target.value })}
          className={cn(controlClass, "max-w-[130px] truncate")}
          aria-label="Heading font"
        >
          {bodyFonts.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={styles.bodySize}
          onChange={(e) => update({ bodySize: Number(e.target.value) })}
          className={cn(controlClass, "w-16")}
          aria-label="Body size"
        >
          {[11, 12, 13, 14, 15, 16, 18, 20].map((s) => (
            <option key={s} value={s}>{s}px</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800"
          aria-expanded={showAdvanced}
        >
          More
          <ChevronDown className={cn("h-3.5 w-3.5", showAdvanced && "rotate-180")} />
        </button>

        {!hideExport && (
          <>
            <div className="flex-1 min-w-[8px]" />
            {exportActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => runAction(action)}
                disabled={!canExport}
                className={cn(
                  "inline-flex h-8 shrink-0 items-center rounded-md px-3 text-xs font-medium transition-colors",
                  !canExport && "opacity-40 cursor-not-allowed",
                  action.variant === "download"
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    : "border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                )}
              >
                {action.label}
              </button>
            ))}
          </>
        )}
      </div>

      {showAdvanced && (
        <div className="flex flex-wrap items-center gap-3 px-3 py-2 border-t border-neutral-200 dark:border-neutral-800">
          {(["h1Size", "h2Size", "h3Size"] as const).map((key, i) => (
            <label key={key} className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-500">
              {["H1", "H2", "H3"][i]}
              <select
                value={styles[key]}
                onChange={(e) => update({ [key]: Number(e.target.value) })}
                className={cn(controlClass, "w-14")}
              >
                {[14, 16, 18, 20, 22, 24, 28, 32, 36].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          ))}
          <select
            value={styles.codeFont}
            onChange={(e) => update({ codeFont: e.target.value })}
            className={cn(controlClass, "max-w-[120px]")}
            aria-label="Code font"
          >
            {monoFonts.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_TYPOGRAPHY)}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      )}

      {!hideExport && (
        <div className="px-3 pb-1 min-h-[1.25rem]">
          <StatusToast status={status} message={message} />
        </div>
      )}
    </div>
  );
}
