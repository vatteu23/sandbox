import { lazy } from "react";
import { FileText, Palette, Globe } from "lucide-react";
import type { ToolDefinition } from "./types";

export const TOOLS: ToolDefinition[] = [
  {
    slug: "markdown-to-google-docs",
    title: "Markdown → Google Docs",
    description:
      "Convert markdown with custom typography. Download .docx or copy formatted text for Google Docs.",
    category: "convert",
    status: "available",
    icon: FileText,
    clientSideOnly: true,
    meta: {
      title: "Markdown to Google Docs | Tools | Uday Vatti",
      description:
        "Client-side markdown converter with typography controls. Download .docx or copy formatted text for Google Docs.",
    },
    component: lazy(() => import("./markdown-to-google-docs/MarkdownConverterTool")),
  },
  {
    slug: "design-token-generator",
    title: "Design Token Generator",
    description:
      "Paste colors, generate CSS variables, Tailwind v4, JSON, Figma variables, and Style Dictionary output.",
    category: "design",
    status: "coming-soon",
    icon: Palette,
    clientSideOnly: true,
    meta: {
      title: "Design Token Generator | Tools | Uday Vatti",
      description:
        "Generate design tokens from colors — CSS variables, Tailwind v4, JSON, Figma, and Style Dictionary.",
    },
    component: lazy(() => import("./design-token-generator/DesignTokenGeneratorTool")),
  },
  {
    slug: "site-atlas",
    title: "Site Atlas",
    description: "Analyze any website's architecture, navigation, and content hierarchy.",
    category: "dev",
    status: "available",
    icon: Globe,
    clientSideOnly: false,
    fullBleed: true,
    meta: {
      title: "Site Atlas | Tools | Uday Vatti",
      description: "Interactive architecture and navigation analysis for any public website.",
    },
    component: lazy(() => import("./site-atlas/SiteAtlasTool")),
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getAvailableTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.status === "available");
}
