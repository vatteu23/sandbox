export interface TypographyStyles {
  bodyFont: string;
  headingFont: string;
  codeFont: string;
  h1Size: number;
  h2Size: number;
  h3Size: number;
  bodySize: number;
  codeSize: number;
}

export const FONT_OPTIONS = [
  { value: "IBM Plex Sans, sans-serif", label: "IBM Plex Sans" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Times New Roman, serif", label: "Times New Roman" },
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Courier New, monospace", label: "Courier New" },
  { value: "IBM Plex Mono, monospace", label: "IBM Plex Mono" },
] as const;

export const DEFAULT_TYPOGRAPHY: TypographyStyles = {
  bodyFont: "IBM Plex Sans, sans-serif",
  headingFont: "IBM Plex Sans, sans-serif",
  codeFont: "IBM Plex Mono, monospace",
  h1Size: 28,
  h2Size: 22,
  h3Size: 18,
  bodySize: 14,
  codeSize: 13,
};

export function typographyToCssVars(styles: TypographyStyles): React.CSSProperties {
  return {
    "--md-body-font": styles.bodyFont,
    "--md-heading-font": styles.headingFont,
    "--md-code-font": styles.codeFont,
    "--md-h1-size": `${styles.h1Size}px`,
    "--md-h2-size": `${styles.h2Size}px`,
    "--md-h3-size": `${styles.h3Size}px`,
    "--md-body-size": `${styles.bodySize}px`,
    "--md-code-size": `${styles.codeSize}px`,
  } as React.CSSProperties;
}
