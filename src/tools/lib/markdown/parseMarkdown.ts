import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import type { Root } from "mdast";

let processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeStringify);

export function parseMarkdownToHtml(markdown: string): string {
  const result = processor.processSync(markdown);
  return String(result);
}

export function parseMarkdownToAst(markdown: string): Root {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  return tree as Root;
}

export function stripMarkdownToPlain(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .trim();
}
