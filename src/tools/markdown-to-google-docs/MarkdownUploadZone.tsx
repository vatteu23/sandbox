"use client";

import { cn } from "@/functions/cn";
import { FileUp } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface MarkdownUploadZoneProps {
  onImport: (text: string) => void;
}

export default function MarkdownUploadZone({ onImport }: MarkdownUploadZoneProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") onImport(text);
      };
      reader.readAsText(file);
    },
    [onImport]
  );

  return (
    <div className="shrink-0 p-4 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-2 mb-3">
        <FileUp className="h-4 w-4 text-neutral-500" aria-hidden="true" />
        <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Upload markdown file
        </h2>
      </div>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) readFile(file);
        }}
        className={cn(
          "w-full rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors",
          dragging
            ? "border-neutral-400 bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-900"
            : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50"
        )}
      >
        <FileUp className="h-7 w-7 mx-auto mb-2 text-neutral-400" aria-hidden="true" />
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
          Drag and drop a file here, or click to select
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          Supports .md, .markdown, .txt
        </p>
      </button>

      <input
        ref={fileRef}
        type="file"
        accept=".md,.txt,.markdown"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
