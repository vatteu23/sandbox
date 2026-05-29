import { useMemo } from "react";
import { parseMarkdown } from "@/functions/markdown";

type RenderedMessageProps = {
  content: string;
};

/**
 * Static rendered message with markdown parsing
 */
export const RenderedMessage: React.FC<RenderedMessageProps> = ({ content }) => {
  const parsedContent = useMemo(() => parseMarkdown(content), [content]);
  return <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{parsedContent}</div>;
};
