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
  return <div className="text-sm">{parsedContent}</div>;
};
