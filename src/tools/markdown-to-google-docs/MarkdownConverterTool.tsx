"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/functions/cn";
import ConverterPageHeader from "./ConverterPageHeader";
import MarkdownEditor from "./MarkdownEditor";
import LivePreviewPanel from "./LivePreviewPanel";
import { parseMarkdownToHtml } from "@/tools/lib/markdown/parseMarkdown";
import { DEFAULT_TYPOGRAPHY } from "@/tools/lib/markdown/defaultStyles";
import { mdToDocx } from "@/tools/lib/markdown/mdToDocx";
import { mdToClipboardHtml } from "@/tools/lib/markdown/mdToClipboardHtml";
import { useToolPersistence } from "@/tools/hooks/useToolPersistence";
import type { ExportAction } from "@/tools/types";

interface PersistedState {
  markdown: string;
  typography: typeof DEFAULT_TYPOGRAPHY;
}

const DEFAULTS: PersistedState = {
  markdown: "",
  typography: DEFAULT_TYPOGRAPHY,
};

const cardClass = cn(
  "flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800",
  "bg-white dark:bg-neutral-950 overflow-hidden",
  "shadow-sm min-h-0 h-[560px] md:h-[74vh] md:max-h-[74vh]"
);

export default function MarkdownConverterTool() {
  const { value, setValue, hydrated } = useToolPersistence<PersistedState>(
    "markdown-to-google-docs",
    DEFAULTS
  );
  const [markdown, setMarkdown] = useState("");
  const [mobileTab, setMobileTab] = useState<"input" | "preview">("input");

  useEffect(() => {
    if (hydrated) setMarkdown(value.markdown);
  }, [hydrated, value.markdown]);

  const typography = value.typography;
  const html = useMemo(
    () => (markdown ? parseMarkdownToHtml(markdown) : ""),
    [markdown]
  );
  const canExport = markdown.trim().length > 0;

  const handleMarkdownChange = (next: string) => {
    setMarkdown(next);
    setValue((prev) => ({ ...prev, markdown: next }));
  };

  const exportActions: ExportAction[] = useMemo(
    () => [
      {
        id: "copy",
        label: "Copy formatted",
        mimeType: "text/html",
        variant: "copy",
        hint: "Paste into Google Docs with Cmd/Ctrl+V",
        getContent: () => mdToClipboardHtml(html, typography),
      },
      {
        id: "docx",
        label: "Download .docx",
        filename: "document.docx",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        variant: "download",
        getContent: () => mdToDocx(markdown, typography),
      },
    ],
    [markdown, html, typography]
  );

  if (!hydrated) {
    return (
      <div
        className="h-[560px] md:h-[74vh] md:max-h-[74vh] animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900"
      />
    );
  }

  return (
    <div>
      <ConverterPageHeader />

      {/* Mobile tabs */}
      <div className="md:hidden flex mb-4 rounded-lg border border-neutral-200 dark:border-neutral-800 p-0.5">
        {(["input", "preview"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMobileTab(tab)}
            className={cn(
              "flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-md transition-colors",
              mobileTab === tab
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                : "text-neutral-500"
            )}
          >
            {tab === "input" ? "Input" : "Preview"}
          </button>
        ))}
      </div>

      {/* Two-card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
        <div className={cn(cardClass, mobileTab !== "input" && "hidden md:flex")}>
          <div className="flex flex-col flex-1 min-h-0 w-full overflow-hidden">
            <MarkdownEditor value={markdown} onChange={handleMarkdownChange} />
          </div>
        </div>

        <div className={cn(cardClass, mobileTab !== "preview" && "hidden md:flex")}>
          <div className="flex flex-col flex-1 min-h-0 w-full overflow-hidden">
          <LivePreviewPanel
            html={html}
            styles={typography}
            onStylesChange={(next) => setValue((prev) => ({ ...prev, typography: next }))}
            exportActions={exportActions}
            canExport={canExport}
          />
          </div>
        </div>
      </div>
    </div>
  );
}
