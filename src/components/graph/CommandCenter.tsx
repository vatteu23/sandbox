"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GraphNode, GraphPath, GraphSearchItem } from "@/data/graph/types";

type CommandMode = "find" | "ask";

type CommandCenterProps = {
  open: boolean;
  isMobile: boolean;
  items: GraphSearchItem[];
  nodes: GraphNode[];
  paths: GraphPath[];
  onClose: () => void;
  onSelect: (item: GraphSearchItem) => void;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function CommandCenter({
  open,
  isMobile,
  items,
  nodes,
  paths,
  onClose,
  onSelect,
}: CommandCenterProps) {
  const [query, setQuery] = useState("");
  const [manualMode, setManualMode] = useState<CommandMode | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setManualMode(null);
    }
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isLoading]);

  const mode = manualMode ?? "find";

  const filtered = useMemo(() => {
    const input = query.trim().toLowerCase();
    if (!input) {
      return items.slice(0, 12);
    }
    return items
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(input) ||
          item.summary.toLowerCase().includes(input)
        );
      })
      .slice(0, 18);
  }, [items, query]);

  const handleAskSend = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    setChatMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: chatMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [chatMessages, isLoading, query]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && mode === "ask") {
      event.preventDefault();
      void handleAskSend();
    }
  };

  if (!open) {
    return null;
  }

  const inputBar = (
    <div className={`flex items-center gap-2 ${isMobile ? "px-4 py-3 border-t border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-950" : "border-b border-neutral-100 dark:border-neutral-900 px-4 py-3"}`}>
      <input
        ref={inputRef}
        value={query}
        autoFocus
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          mode === "ask"
            ? "Ask anything about Uday..."
            : "Search work, concepts, paths..."
        }
        className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
      />
      {mode === "ask" && (
        <button
          type="button"
          onClick={() => void handleAskSend()}
          disabled={!query.trim() || isLoading}
          className="flex-shrink-0 h-8 w-8 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center disabled:opacity-30 transition-opacity"
          aria-label="Send"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[80] flex flex-col" style={{ height: "100dvh" }}>
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          role="dialog"
          aria-modal="true"
          className="relative flex-1 w-full bg-white dark:bg-neutral-950 rounded-t-2xl border-t border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden mt-2"
        >
          {/* Header with drag handle and controls */}
          <div className="flex-shrink-0 px-4 pt-3 pb-2">
            <div className="flex justify-center mb-3">
              <div className="w-8 h-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setManualMode("find")}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] ${
                    mode === "find"
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "border border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
                  }`}
                >
                  Find
                </button>
                <button
                  type="button"
                  onClick={() => setManualMode("ask")}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] ${
                    mode === "ask"
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "border border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
                  }`}
                >
                  Ask
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Find mode: input at top, results scroll */}
          {mode === "find" && (
            <>
              <div className="flex-shrink-0 px-4 py-2 border-b border-neutral-100 dark:border-neutral-900">
                <input
                  ref={inputRef}
                  value={query}
                  autoFocus
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search work, concepts, paths..."
                  className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
                />
              </div>
              <div className="flex-1 overflow-y-auto p-2 min-h-0">
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-sm text-neutral-500 dark:text-neutral-400">
                    No matches. Try a concept or project name.
                  </p>
                )}
                {filtered.map((item) => (
                  <button
                    type="button"
                    key={`${item.type}-${item.id}`}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="w-full rounded-xl px-3 py-3 text-left active:bg-neutral-50 dark:active:bg-neutral-900 transition-colors"
                  >
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                      {item.summary}
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 mt-1.5">
                      {item.type}
                    </p>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Ask mode: messages scroll, input pinned at bottom */}
          {mode === "ask" && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
                <div className="space-y-3">
                  {chatMessages.length === 0 && !isLoading && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed py-8 text-center">
                      Ask about my projects, process, or what I'm working on.
                    </p>
                  )}

                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={
                        msg.role === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={[
                          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                            : "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
                        ].join(" ")}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2.5">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </div>
              {inputBar}
            </>
          )}
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="fixed inset-0 z-[80]">
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative mx-auto mt-24 max-w-2xl rounded-2xl max-h-[70vh] w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl flex flex-col"
      >
        <div className="border-b border-neutral-100 dark:border-neutral-900 px-4 py-3 flex-shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setManualMode("find")}
              className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] ${
                mode === "find"
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "border border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
              }`}
            >
              Find
            </button>
            <button
              type="button"
              onClick={() => setManualMode("ask")}
              className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] ${
                mode === "ask"
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "border border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
              }`}
            >
              Ask
            </button>
          </div>
          <input
            ref={inputRef}
            value={query}
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              mode === "ask"
                ? "Ask anything about Uday..."
                : "Search work, concepts, paths..."
            }
            className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2 min-h-0">
          {mode === "find" ? (
            <>
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-sm text-neutral-500 dark:text-neutral-400">
                  No matches yet. Try a concept, project name, or path keyword.
                </p>
              )}
              {filtered.map((item) => (
                <button
                  type="button"
                  key={`${item.type}-${item.id}`}
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
            </>
          ) : (
            <div className="px-3 py-4 space-y-4">
              {chatMessages.length === 0 && !isLoading && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Ask about my projects, process, technical strengths, or what I'm working on.
                </p>
              )}

              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                        : "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
                    ].join(" ")}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
