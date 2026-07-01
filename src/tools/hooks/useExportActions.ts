"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { copyToClipboard } from "@/tools/lib/export/copyToClipboard";
import { downloadBlob, downloadText } from "@/tools/lib/export/downloadBlob";
import type { ExportAction } from "@/tools/types";
import type { ExportStatus } from "@/tools/lib/export/types";

export function useExportActions() {
  const [status, setStatus] = useState<ExportStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [lastActionId, setLastActionId] = useState<string | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const scheduleReset = useCallback(() => {
    clearResetTimer();
    resetTimerRef.current = window.setTimeout(() => {
      setStatus("idle");
      setMessage("");
      setLastActionId(null);
      resetTimerRef.current = null;
    }, 2500);
  }, [clearResetTimer]);

  useEffect(() => () => clearResetTimer(), [clearResetTimer]);

  const runAction = useCallback(async (action: ExportAction) => {
    if (isRunning) return;
    clearResetTimer();
    setIsRunning(true);
    setLastActionId(action.id);

    try {
      const content = await action.getContent();

      if (action.variant === "download") {
        if (content instanceof Blob) {
          downloadBlob(content, action.filename ?? "export");
        } else {
          downloadText(content, action.filename ?? "export.txt", action.mimeType);
        }
        setMessage(`Downloaded ${action.filename ?? "file"}`);
      } else {
        const plain = content instanceof Blob ? await content.text() : content;
        const html = action.mimeType === "text/html" ? plain : undefined;
        await copyToClipboard({ html, plain });
        setMessage(action.hint ?? "Copied to clipboard");
      }

      setStatus("success");
      scheduleReset();
    } catch {
      setStatus("error");
      setMessage("Export failed — try again");
      scheduleReset();
    } finally {
      setIsRunning(false);
    }
  }, [clearResetTimer, isRunning, scheduleReset]);

  return { status, message, isRunning, lastActionId, runAction };
}
