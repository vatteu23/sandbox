"use client";

import { useEffect, useMemo, useState } from "react";
import type { GraphSearchItem } from "@/data/graph/types";

type SearchDialogProps = {
  items: GraphSearchItem[];
  open: boolean;
  onClose: () => void;
  onSelect: (item: GraphSearchItem) => void;
};

export default function SearchDialog({
  items,
  open,
  onClose,
  onSelect,
}: SearchDialogProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filtered = useMemo(() => {
    const input = query.trim().toLowerCase();
    if (!input) {
      return items.slice(0, 24);
    }

    return items
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(input) ||
          item.summary.toLowerCase().includes(input)
        );
      })
      .slice(0, 24);
  }, [items, query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24">
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl">
        <div className="border-b border-neutral-100 dark:border-neutral-900 px-4 py-3">
          <input
            value={query}
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search concepts, practices, and supporting work..."
            className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          />
        </div>
        <div className="max-h-[420px] overflow-y-auto overscroll-contain p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-sm text-neutral-500 dark:text-neutral-400">
              No matches found. Try searching by concept or project name.
            </p>
          )}
          {filtered.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className="w-full rounded-xl px-3 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {item.title}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {item.summary}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 mt-2">
                {item.type}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
