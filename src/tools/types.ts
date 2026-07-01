import type { LucideIcon } from "lucide-react";
import type { ComponentType, LazyExoticComponent } from "react";

export type ToolStatus = "available" | "coming-soon";
export type ToolCategory = "convert" | "design" | "dev";

export interface ToolDefinition {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  icon: LucideIcon;
  clientSideOnly?: boolean;
  fullBleed?: boolean;
  meta: {
    title: string;
    description: string;
  };
  component: LazyExoticComponent<ComponentType>;
}

export interface ExportAction {
  id: string;
  label: string;
  filename?: string;
  mimeType: string;
  variant: "copy" | "download";
  getContent: () => string | Promise<string | Blob>;
  hint?: string;
}
