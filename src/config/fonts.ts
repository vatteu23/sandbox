import { IBM_Plex_Mono, IBM_Plex_Sans, Major_Mono_Display } from "next/font/google";

// Font configurations - must be const at module scope
const primaryFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const displayFont = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Export fonts object
export const fonts = {
  primary: primaryFont,
  mono: monoFont,
  display: displayFont,
} as const;

// Font class names for easy use
export const fontClasses = {
  primary: "font-primary",
  mono: "font-mono", 
  display: "font-display",
} as const;

// Get all font variables for className
export const getFontVariables = () => {
  return Object.values(fonts).map(font => font.variable).join(" ");
};

// Font family options for Typography component
export type FontFamily = keyof typeof fontClasses;