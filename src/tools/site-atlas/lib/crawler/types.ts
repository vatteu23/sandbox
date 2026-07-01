export interface LinkGroup {
  internal: string[];
  external: string[];
}

export interface PageLinks {
  content: LinkGroup;
  navigation: LinkGroup;
}

export interface CrawlNode {
  id: string;
  url: string;
  title: string;
  depth: number;
  category: string;
  wordCount: number;
  headings: { h1: number; h2: number; h3: number };
  metadata: {
    description?: string;
    canonical?: string;
    ogImage?: string;
  };
  accessibility: {
    missingAltText: number;
    ariaLabels: number;
  };
  links: PageLinks;
  statusCode?: number;
  redirectTo?: string;
}

export interface CrawlEdge {
  id: string;
  source: string;
  target: string;
}

export interface ParsedPage {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  wordCount: number;
  headings: { h1: number; h2: number; h3: number };
  accessibility: { missingAltText: number; ariaLabels: number };
  links: PageLinks;
  linkHrefs: string[];
}

export interface CrawlProgressEvent {
  event: "start" | "node" | "node_update" | "edge" | "status" | "complete";
  data: unknown;
}

export const EMPTY_PAGE_LINKS: PageLinks = {
  content: { internal: [], external: [] },
  navigation: { internal: [], external: [] },
};
