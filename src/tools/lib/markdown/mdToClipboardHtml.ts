import type { TypographyStyles } from "./defaultStyles";

export function wrapHtmlForClipboard(html: string, styles: TypographyStyles): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<div style="font-family: ${styles.bodyFont}; font-size: ${styles.bodySize}px; line-height: 1.6; color: #171717;">
<style>
  h1 { font-family: ${styles.headingFont}; font-size: ${styles.h1Size}px; margin: 0 0 12px; }
  h2 { font-family: ${styles.headingFont}; font-size: ${styles.h2Size}px; margin: 20px 0 8px; }
  h3 { font-family: ${styles.headingFont}; font-size: ${styles.h3Size}px; margin: 16px 0 8px; }
  p { margin: 0 0 12px; }
  ul, ol { margin: 0 0 12px; padding-left: 24px; }
  blockquote { margin: 12px 0; padding-left: 16px; border-left: 3px solid #d4d4d4; color: #525252; }
  code, pre { font-family: ${styles.codeFont}; font-size: ${styles.codeSize}px; }
  pre { background: #f5f5f5; padding: 12px; border-radius: 6px; overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; }
  th, td { border: 1px solid #e5e5e5; padding: 8px 12px; text-align: left; }
  th { background: #f5f5f5; font-weight: 600; }
  a { color: #2563eb; }
</style>
${html}
</div>
</body></html>`;
}

export function mdToClipboardHtml(html: string, styles: TypographyStyles): string {
  return wrapHtmlForClipboard(html, styles);
}
