import type { CopyOptions } from "./types";

export async function copyToClipboard({ html, plain }: CopyOptions): Promise<void> {
  if (html && typeof ClipboardItem !== "undefined") {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plain], { type: "text/plain" }),
        }),
      ]);
      return;
    } catch {
      // fall through to plain text
    }
  }

  await navigator.clipboard.writeText(plain);
}
