"use client";

import { cn } from "@/functions/cn";
import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

interface PasteZoneProps {
  onText: (text: string) => void;
  accept?: string;
  label?: string;
  className?: string;
}

export default function PasteZone({
  onText,
  accept = ".md,.txt,.markdown",
  label = "Drop a file here",
  className,
}: PasteZoneProps) {
  const [dragging, setDragging] = useState(false);

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") onText(text);
      };
      reader.readAsText(file);
    },
    [onText]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) readFile(file);
    },
    [readFile]
  );

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer text-xs font-mono",
        "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors",
        dragging && "text-neutral-900 dark:text-neutral-100",
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <Upload className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
      <input
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
          e.target.value = "";
        }}
      />
    </label>
  );
}
